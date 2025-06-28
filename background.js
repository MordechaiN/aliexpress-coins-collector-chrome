/**
 * @author Mordechai Neeman
 * @copyright 2025
 * @license Custom License
 * @see https://github.com/MordechaiN/aliexpress-coins-collector-chrome
 */

// רשימת הלינקים - עכשיו תיטען מ-storage

const SHOPS = [
  "0094d30d6bb64404a457758cb172d3a6",
  "0103f01098e1461bbf4cee788761e159",
  "10c6c63f72cf43d0925970a990f7232d",
  "1465f54c3802430a86efe9f859d1d641",
  "1fcb3e07f8f2471c95161497d80a91f7",
  "470df0c30a0848dcb5382104e3d26b95",
  "5a96e8a378fe418fbd20331ff74a1b97",
  "6446f9b385c249fb9baa289214f016e1",
  "6b0870a9d7a943b1b08a4b275905c8e3",
  "a73426260b7f4ebab4d8bc2e268d2e89",
  "aa738abeccb3427aa9a704f845d0f1db",
  "abb7e1dcd089459c9c34116414ed7b68",
  "dacc7e77b34f4360ad2b3f93b03141bc",
  "e5ba5b7349344a0987687e67ca3e54fe",
];

let LINKS = SHOPS.map(id => `https://sale.aliexpress.com/__mobile/wTTBw4hZBz_m.htm?outBizId=${id}&identity=SHOP`);

let isLoggingEnabled = true;
let currentProcessing = false;

// משתנים חדשים למעקב סטטיסטיקות
let dailyStats = { successful: 0, failed: 0, total: 0, startTime: null };

// משתנים חדשים לאנליטיקה מתקדמת
let analytics = {
  dailyStats: [], // מכיל אובייקטים עם תאריך והצלחות ליום
  totalCoins: 0, // סיכום כל ההצלחות מההתחלה
  currentStreak: 0, // רצף ימים עם לפחות הצלחה אחת
  lastRunDate: null
};

// פונקציה לטעינת אנליטיקה מ-storage
async function loadAnalyticsFromStorage() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['analytics'], (result) => {
      if (result.analytics) {
        analytics = { ...analytics, ...result.analytics };
      }
      resolve();
    });
  });
}

// פונקציה לשמירת אנליטיקה ב-storage
function saveAnalyticsToStorage() {
  chrome.storage.sync.set({ analytics }, () => {
    log('נתוני אנליטיקה נשמרו');
  });
}

// פונקציה לעדכון סטטיסטיקות יומיות

function updateDailyStats(successful, failed, duration) {
  const today = new Date().toISOString().split('T')[0];
  
  let todayStats = analytics.dailyStats.find(day => day.date === today) || {
    date: today,
    successful: 0,
    failed: 0,
    total: 0,
    successRate: 0,
    duration: 0,
    coinsCollected: 0
  };

  todayStats.successful += successful;
  todayStats.failed += failed;
  todayStats.total = todayStats.successful + todayStats.failed;
  todayStats.coinsCollected = todayStats.successful; // 1 מטבע = 1 הצלחה
  todayStats.successRate = Math.round((todayStats.successful / todayStats.total) * 100) || 0;

  analytics.totalCoins += successful; // מוסיף להצלחות הכלליות
}

// פונקציה לעדכון רצף ימים
function updateStreak(today, wasSuccessful) {
  if (wasSuccessful) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (analytics.lastRunDate === yesterdayStr || analytics.lastRunDate === today) {
      analytics.currentStreak++;
    } else {
      analytics.currentStreak = 1;
    }
  } else {
    analytics.currentStreak = 0;
  }
}

// פונקציה לקבלת נתוני אנליטיקה
function getAnalyticsData() {
  const today = new Date().toISOString().split('T')[0];
  const todayStats = analytics.dailyStats.find(day => day.date === today) || 
    { successful: 0, failed: 0, total: 0, successRate: 0, duration: 0 };

  const weeklyStats = analytics.dailyStats
    .filter(day => {
      const dayDate = new Date(day.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return dayDate >= weekAgo;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    today: todayStats,
    weekly: weeklyStats,
    total: {
      coins: analytics.totalCoins,
      streak: analytics.currentStreak
    },
    dailyStats: weeklyStats
  };
}

// פונקציה להצגת התראות ידידותיות
function showNotification(title, message, type = 'basic') {
  const iconUrl = type === 'success' ? 'icon48.png' : 
                  type === 'error' ? 'icon48.png' : 'icon48.png';
  
  chrome.notifications.create({
    type: 'basic',
    iconUrl: iconUrl,
    title: title,
    message: message,
    priority: 1
  });
}

// פונקציה לטעינת לינקים מ-storage
async function loadLinksFromStorage() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['customLinks'], (result) => {
      if (result.customLinks && result.customLinks.length > 0) {
        LINKS = result.customLinks;
        log(`נטענו ${LINKS.length} לינקים מהאחסון`);
      } else {
        // שמירת הלינקים הדיפולטיים בפעם הראשונה
        saveLinksToStorage(LINKS);
      }
      resolve();
    });
  });
}

// פונקציה לשמירת לינקים ב-storage
function saveLinksToStorage(links) {
  chrome.storage.sync.set({ customLinks: links }, () => {
    log(`נשמרו ${links.length} לינקים באחסון`);
  });
}

// פונקציה לרישום לוג
function log(message) {
  if (isLoggingEnabled) {
    const timestamp = new Date().toLocaleString('he-IL');
    console.log(`[${timestamp}] AliExpress Coins Collector: ${message}`);
    
    chrome.storage.sync.get(['logs'], (result) => {
      const logs = result.logs || [];
      logs.push(`[${timestamp}] ${message}`);
      
      if (logs.length > 100) {
        logs.splice(0, logs.length - 100);
      }
      
      chrome.storage.sync.set({ logs });
    });
  }
}

// פונקציה לחישוב הזמן הבא של 10:30
function getNext1030() {
  const now = new Date();
  let target = new Date();
  target.setHours(10, 30, 0, 0);
  
  if (now >= target) {
    target.setDate(target.getDate() + 1);
  }
  
  return target.getTime();
}

// יצירת alarm לשעה 10:30 יומית
chrome.runtime.onInstalled.addListener(async () => {
  log('התוסף הותקן בהצלחה');
  showNotification('🎉 AliExpress Coins Collector', 'התוסף הותקן בהצלחה! איסוף מטבעות יתחיל מחר בשעה 10:30', 'success');
  
  // טעינת לינקים מאחסון
  await loadLinksFromStorage();
  await loadAnalyticsFromStorage();
  
  chrome.alarms.create('dailyAliExpressTask', {
    when: getNext1030(),
    periodInMinutes: 24 * 60
  });
  
  log('נקבע תזמון יומי לשעה 10:30');
});

// מאזין ל-alarms
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'dailyAliExpressTask' && !currentProcessing) {
    log('התחלת עיבוד יומי של לינקים');
    currentProcessing = true;
    
    // איפוס סטטיסטיקות יומיות
    dailyStats = { successful: 0, failed: 0, total: LINKS.length, startTime: new Date() };
    
    // התראת התחלה
    showNotification('🚀 התחלת איסוף מטבעות', `מתחיל לעבד ${LINKS.length} לינקים...`, 'basic');
    
    try {
      await loadLinksFromStorage(); // טעינה מחדש של הלינקים
      await processAllLinks();
    } catch (error) {
      log(`שגיאה בעיבוד: ${error.message}`);
      showNotification('❌ שגיאה באיסוף', `שגיאה: ${error.message}`, 'error');
    } finally {
      currentProcessing = false;
      
      // התראת סיום עם סטטיסטיקות
      const duration = Math.round((new Date() - dailyStats.startTime) / 1000 / 60);
      const successRate = Math.round((dailyStats.successful / dailyStats.total) * 100);
      
      showNotification(
        '✅ איסוף מטבעות הושלם!', 
        `הצלחות: ${dailyStats.successful}/${dailyStats.total} (${successRate}%) | זמן: ${duration} דקות`, 
        'success'
      );
      
      // עדכון אנליטיקה
      updateDailyStats(dailyStats.successful, dailyStats.failed, duration);
      
      log(`סיום עיבוד יומי - הצלחות: ${dailyStats.successful}, כישלונות: ${dailyStats.failed}`);
    }
  }
});

async function processAllLinks() {
  for (let i = 0; i < LINKS.length; i++) {
    const link = LINKS[i];
    log(`פותח לינק ${i + 1}/${LINKS.length}: ${link.substring(0, 50)}...`);
    try {
      // הפיכת chrome.tabs.create ל-Promise
      const tab = await new Promise((resolve, reject) => {
        chrome.tabs.create({ url: link, active: false }, (tab) => {
          if (chrome.runtime.lastError || !tab) reject(new Error(chrome.runtime.lastError?.message || 'Error opening tab'));
          else resolve(tab);
        });
      });
      
      // המתנה לטעינת הדף
      await waitForTabLoad(tab.id);
      
      // הפיכת chrome.scripting.executeScript ל-Promise
      const result = await new Promise((resolve, reject) => {
        chrome.scripting.executeScript(
          { target: { tabId: tab.id }, func: performPageActions },
          (results) => {
            if (chrome.runtime.lastError || !results) reject(new Error(chrome.runtime.lastError?.message || 'Script execution failed'));
            else resolve(results);
          }
        );
      });
      
      // בדיקת תוצאה
      if (result && result[0] && result[0].result) {
        // הצלחה
        dailyStats.successful++;
        log(`לינק ${i + 1} הושלם בהצלחה ✅`);
      } else {
        // לא נמצא כפתור או שגיאה
        dailyStats.failed++;
        log(`לינק ${i + 1} - לא נמצא כפתור ❌`);
      }
      
      // סגירת הטאב
      await new Promise((resolve) => {
        chrome.tabs.remove(tab.id, () => resolve());
      });
      
      await sleep(2000); // מנוחה בין לינקים
    } catch (error) {
      // טיפול בשגיאות
      dailyStats.failed++;
      log(`שגיאה בלינק ${i + 1}: ${error.message} 💥`);
    }
    
    // התראת התקדמות כל 3 לינקים
    if ((i + 1) % 3 === 0 && i < LINKS.length - 1) {
      showNotification(
        '⏳ איסוף בתהליך...', 
        `הושלמו ${i + 1}/${LINKS.length} לינקים (${dailyStats.successful} הצלחות)`, 
        'basic'
      );
    }
  }
}


// פונקציה להמתנה לטעינת טאב
function waitForTabLoad(tabId) {
  return new Promise((resolve) => {
    const checkStatus = () => {
      chrome.tabs.get(tabId, (tab) => {
        if (chrome.runtime.lastError) {
          resolve();
          return;
        }
        
        if (tab.status === 'complete') {
          resolve();
        } else {
          setTimeout(checkStatus, 500);
        }
      });
    };
    
    checkStatus();
  });
}

// פונקציה להמתנה
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// פונקציה שתרוץ בדף (content script)
function performPageActions() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('מחפש כפתור כניסה');
      
      const buttons = document.querySelectorAll('div.ci-button, button, [role="button"]');
      let targetButton = null;
      
      // לוגיקה משופרת לזיהוי כפתורים
      for (const button of buttons) {
        const text = button.textContent.trim().toLowerCase();
        if (
          text.includes('כניסה') || 
          text.includes('enter') || 
          text.includes('sign in') ||
          button.getAttribute('data-spm')?.includes('sign')
        ) {
          targetButton = button;
          break;
        }
      }
      
      if (targetButton) {
        console.log('נמצא כפתור, לוחץ עליו');
        targetButton.click();
        resolve(true); // החזרת הצלחה אמיתית
      } else {
        console.log('לא נמצא כפתור מתאים');
        resolve(false); // החזרת כישלון
      }
    }, 5000);
  });
}


// מאזין להודעות מה-popup - מורחב עם פונקציות חדשות
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStatus') {
    sendResponse({
      isLoggingEnabled,
      currentProcessing,
      nextRun: getNext1030(),
      dailyStats
    });
  } else if (request.action === 'toggleLogging') {
    isLoggingEnabled = !isLoggingEnabled;
    log(`לוג ${isLoggingEnabled ? 'הופעל' : 'כובה'}`);
    sendResponse({ isLoggingEnabled });
  } else if (request.action === 'testRun') {
    if (!currentProcessing) {
      log('הפעלת בדיקה ידנית');
      showNotification('🧪 בדיקה ידנית', 'מתחיל בדיקה ידנית של איסוף מטבעות...', 'basic');
      
      // איפוס סטטיסטיקות לבדיקה
      dailyStats = { successful: 0, failed: 0, total: LINKS.length, startTime: new Date() };
      
      loadLinksFromStorage().then(() => {
        processAllLinks();
      });
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false, message: 'עיבוד כבר רץ' });
    }
  } else if (request.action === 'getLogs') {
    chrome.storage.sync.get(['logs'], (result) => {
      sendResponse({ logs: result.logs || [] });
    });
    return true;
  } 
  // פונקציות חדשות לניהול לינקים
  else if (request.action === 'getLinks') {
    sendResponse({ links: LINKS });
  } else if (request.action === 'addLink') {
    if (request.link && request.link.includes('aliexpress.com')) {
      LINKS.push(request.link);
      saveLinksToStorage(LINKS);
      log(`נוסף לינק חדש: ${request.link.substring(0, 50)}...`);
      showNotification('➕ לינק נוסף', 'לינק חדש נוסף בהצלחה לרשימה!', 'success');
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false, message: 'לינק לא תקין' });
    }
  } else if (request.action === 'deleteLink') {
    if (request.index >= 0 && request.index < LINKS.length) {
      const deletedLink = LINKS.splice(request.index, 1)[0];
      saveLinksToStorage(LINKS);
      log(`נמחק לינק: ${deletedLink.substring(0, 50)}...`);
      showNotification('🗑️ לינק נמחק', 'לינק הוסר בהצלחה מהרשימה!', 'basic');
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false, message: 'אינדקס לא תקין' });
    }
  } else if (request.action === 'importLinks') {
    if (request.links && Array.isArray(request.links)) {
      LINKS = [...LINKS, ...request.links];
      saveLinksToStorage(LINKS);
      log(`יובאו ${request.links.length} לינקים חדשים`);
      showNotification('📥 לינקים יובאו', `${request.links.length} לינקים חדשים יובאו בהצלחה!`, 'success');
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false, message: 'רשימת לינקים לא תקינה' });
    }
  } else if (request.action === 'getAnalytics') {
    const analyticsData = getAnalyticsData();
    sendResponse({ analytics: analyticsData });
  } else if (request.action === 'resetAnalytics') {
    analytics = {
      dailyStats: [],
      totalCoins: 0,
      currentStreak: 0,
      lastRunDate: null
    };
    saveAnalyticsToStorage();
    log('נתוני אנליטיקה אופסו');
    sendResponse({ success: true });
  } else if (request.action === 'closeCurrentTab') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.remove(tabs[0].id);
      }
    });
    sendResponse({ success: true });
  }
});
