/**
 * @author Mordechai Neeman
 * @copyright 2025
 * @license Custom License
 * @see https://github.com/MordechaiN/aliexpress-coins-collector-chrome
 */

// רשימת הלינקים - עכשיו תיטען מ-storage
let LINKS = [
  "https://sale.aliexpress.com/__mobile/wTTBw4hZBz_m.htm?outBizId=5a96e8a378fe418fbd20331ff74a1b97&identity=SHOP&shopNowRedirect=https%253A%252F%252Fwww.aliexpress.com%252Fstore%252F1051119&spm=a2g0n.store_m_home.checkin_with_prize_2002708235515.0&statusBarHeight=93&_currency=USD&_lang=en_MA&fromApp=true&_launchTID=f50d9910-fd81-4c7a-a5e4-88da9ebb1219&aff_fcid=1010fe80a381497ea5be63e6f27ae502-1723128525135-02380-_DkopTOr&tt=CPS_NORMAL&aff_fsk=_DkopTOr&nr=n&_dognoseId=WlBpb1lNZEl5cWtEQUpDRnFRTHhkVlkBkTJ2rNJhbGlleHByZQAAA48y&aff_fcid=2c74dbb1986d4cf9a0506a067b901b78-1743156791321-08463-_DDxpLMf&tt=CPS_NORMAL&aff_fsk=_DDxpLMf&aff_platform=portals-tool&sk=_DDxpLMf&aff_trace_key=2c74dbb1986d4cf9a0506a067b901b78-1743156791321-08463-_DDxpLMf&terminal_id=bd170ef5df5a49228059a474d1c1c1ea",
  "https://sale.aliexpress.com/__mobile/wTTBw4hZBz_m.htm?outBizId=1fcb3e07f8f2471c95161497d80a91f7&identity=SHOP&shopNowRedirect=https%253A%252F%252Fwww.aliexpress.com%252Fstore%252F912370197&spm=a2g0n.store_m_home.checkin_with_prize_2008922585801.0&statusBarHeight=93&_currency=USD&_lang=en_MA&fromApp=true&_launchTID=0f86239d-ecea-4ef1-ab2c-c931809923b5&aff_fcid=5a7aebf80d1e4b47a86252f26eb55e31-1723139618559-08629-_DcJtNQP&tt=CPS_NORMAL&aff_fsk=_DcJtNQP&nr=n&_dognoseId=WlBpb1lNZEl5cWtEQUpDRnFRTHhkVlkBkTMf8rJhbGlleHByZQAAAXls&aff_fcid=36b877b12bff40ffa968b1c48a4d8d3c-1743156817542-08565-_DmmmKt5&tt=CPS_NORMAL&aff_fsk=_DmmmKt5&aff_platform=portals-tool&sk=_DmmmKt5&aff_trace_key=36b877b12bff40ffa968b1c48a4d8d3c-1743156817542-08565-_DmmmKt5&terminal_id=bd170ef5df5a49228059a474d1c1c1ea",
  "https://sale.aliexpress.com/__mobile/wTTBw4hZBz_m.htm?outBizId=1465f54c3802430a86efe9f859d1d641&identity=SHOP&shopNowRedirect=https%253A%252F%252Fwww.aliexpress.com%252Fstore%252F1927090&spm=a2g0n.store_m_home.checkin_with_prize_2003858993902.0&statusBarHeight=93&_currency=USD&_lang=en_MA&fromApp=true&_launchTID=174d326a-4cef-481c-8b5c-e591ce0bbc75&aff_fcid=d4a8a827f5b7458f9e5a482f518c47b3-1723139781080-02704-_DlfIOxz&tt=CPS_NORMAL&aff_fsk=_DlfIOxz&nr=n&_dognoseId=WlBpb1lNZEl5cWtEQUpDRnFRTHhkVlkBkTMibNdhbGlleHByZQAAA1Hg&aff_fcid=53a5adee1bff470694d31843c1ce514d-1743156824186-07543-_DmLqKZV&tt=CPS_NORMAL&aff_fsk=_DmLqKZV&aff_platform=portals-tool&sk=_DmLqKZV&aff_trace_key=53a5adee1bff470694d31843c1ce514d-1743156824186-07543-_DmLqKZV&terminal_id=bd170ef5df5a49228059a474d1c1c1ea",
  "https://sale.aliexpress.com/__mobile/wTTBw4hZBz_m.htm?_t=1728044340.120206&outBizId=0094d30d6bb64404a457758cb172d3a6&identity=SHOP&aff_fcid=8cb175eb36164cd6a8e57ec119fb04ba-1743617164483-08272-_om9LlmZ&tt=CPS_NORMAL&aff_fsk=_om9LlmZ&locale=en_US&dp=e8012ed7ffc93a78e7a3e45763140086&af=985336&cv=47843&afref=&mall_affr=pr3&utm_source=admitad&utm_medium=cpa&utm_campaign=985336&utm_content=47843&dp=e8012ed7ffc93a78e7a3e45763140086&af=985336&cv=47843&afref=&mall_affr=pr3&utm_source=admitad&utm_medium=cpa&utm_campaign=985336&utm_content=47843&aff_fcid=8e1508326062422993ed14eadf49ca10-1743617178915-05367-_ePNSNV&aff_fsk=_ePNSNV&aff_platform=portals-tool&sk=_ePNSNV&aff_trace_key=8e1508326062422993ed14eadf49ca10-1743617178915-05367-_ePNSNV&terminal_id=bd170ef5df5a49228059a474d1c1c1ea",
  "https://sale.aliexpress.com/__mobile/wTTBw4hZBz_m.htm?_t=1733067756.609393&outBizId=6446f9b385c249fb9baa289214f016e1&identity=SHOP&aff_fcid=1666b973aa7f4245ba8145bbc363fb10-1743617166913-08579-_oDedTln&tt=CPS_NORMAL&aff_fsk=_oDedTln&locale=en_US&dp=fcaaa7b3661eb7693313773740718378&af=985336&cv=47843&afref=&mall_affr=pr3&utm_source=admitad&utm_medium=cpa&utm_campaign=985336&utm_content=47843&dp=fcaaa7b3661eb7693313773740718378&af=985336&cv=47843&afref=&mall_affr=pr3&utm_source=admitad&utm_medium=cpa&utm_campaign=985336&utm_content=47843&aff_fcid=a0527ed4eec346b7a87ab39b02dfcf0d-1743617181533-00365-_ePNSNV&aff_fsk=_ePNSNV&aff_platform=portals-tool&sk=_ePNSNV&aff_trace_key=a0527ed4eec346b7a87ab39b02dfcf0d-1743617181533-00365-_ePNSNV&terminal_id=bd170ef5df5a49228059a474d1c1c1ea",
  "https://sale.aliexpress.com/__mobile/wTTBw4hZBz_m.htm?_t=1728044562.681774&outBizId=e5ba5b7349344a0987687e67ca3e54fe&identity=SHOP&aff_fcid=5eee0a5c179944d89f722dc3cb773b6b-1743617168311-05960-_olkfTLL&tt=CPS_NORMAL&aff_fsk=_olkfTLL&locale=en_US&dp=2f5857cf31d6454fcadf4fd751ff74ad&af=985336&cv=47843&afref=&mall_affr=pr3&utm_source=admitad&utm_medium=cpa&utm_campaign=985336&utm_content=47843&dp=2f5857cf31d6454fcadf4fd751ff74ad&af=985336&cv=47843&afref=&mall_affr=pr3&utm_source=admitad&utm_medium=cpa&utm_campaign=985336&utm_content=47843&aff_fcid=af2bc454987d4dbba61368216735a82c-1743617183730-06619-_ePNSNV&aff_fsk=_ePNSNV&aff_platform=portals-tool&sk=_ePNSNV&aff_trace_key=af2bc454987d4dbba61368216735a82c-1743617183730-06619-_ePNSNV&terminal_id=bd170ef5df5a49228059a474d1c1c1ea",
  "https://sale.aliexpress.com/__mobile/wTTBw4hZBz_m.htm?_t=1733067520.787595&outBizId=6b0870a9d7a943b1b08a4b275905c8e3&identity=SHOP&aff_fcid=6905cbbde8a14efd9bf766ad9f42f948-1743617170363-04091-_opIfj8N&tt=CPS_NORMAL&aff_fsk=_opIfj8N&locale=en_US&dp=13fad9fc7cceccad0d412bdd368d4f99&af=985336&cv=47843&afref=&mall_affr=pr3&utm_source=admitad&utm_medium=cpa&utm_campaign=985336&utm_content=47843&dp=13fad9fc7cceccad0d412bdd368d4f99&af=985336&cv=47843&afref=&mall_affr=pr3&utm_source=admitad&utm_medium=cpa&utm_campaign=985336&utm_content=47843&aff_fcid=2b547d82d0a243f1b68d1d7611b8041c-1743617288034-03907-_ePNSNV&aff_fsk=_ePNSNV&aff_platform=portals-tool&sk=_ePNSNV&aff_trace_key=2b547d82d0a243f1b68d1d7611b8041c-1743617288034-03907-_ePNSNV&terminal_id=bd170ef5df5a49228059a474d1c1c1ea",
  "https://a.aliexpress.com/_olMBKvy",
  "https://a.aliexpress.com/_olNZenu",
  "https://a.aliexpress.com/_olu47Z0",
  "https://a.aliexpress.com/_oB9rh3U",
  "https://a.aliexpress.com/_omSAcY6",
  "https://a.aliexpress.com/_ooHkL3U",
  "https://a.aliexpress.com/_oEhcJYQ",
  "https://a.aliexpress.com/_olG7hHs",
  "https://a.aliexpress.com/_onMVgui",
  "https://a.aliexpress.com/_onWieHy",
  "https://a.aliexpress.com/_oEu4poq",
  "https://a.aliexpress.com/_oDHtT0W",
  "https://a.aliexpress.com/_oDpDtNC"
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
  
  // מוודא שהנתונים היומיים נמצאים במערך
  const existingIndex = analytics.dailyStats.findIndex(day => day.date === today);
  if (existingIndex >= 0) {
    analytics.dailyStats[existingIndex] = todayStats;
  } else {
    analytics.dailyStats.push(todayStats);
  }
  
  analytics.lastRunDate = today;
  updateStreak(today, successful > 0);
  saveAnalyticsToStorage();
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
        dailyStats.successful++;
        log(`לינק ${i + 1} הושלם בהצלחה ✅`);
      } else {
        dailyStats.failed++;
        log(`לינק ${i + 1} - לא נמצא כפתור ❌`);
      }
      
      // סגירת הטאב
      await new Promise((resolve) => {
        chrome.tabs.remove(tab.id, () => resolve());
      });
      
      await sleep(5000); // מנוחה בין לינקים
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
          setTimeout(checkStatus, 2000);
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
          console.log('מחפש כפתור כניסה/איסוף');
          
          // חיפוש מורחב של כפתורים
          const allButtons = document.querySelectorAll(`
              div.ci-button, 
              button, 
              [role="button"], 
              div[class*="button"], 
              div[class*="collect"],
              div[class*="checkin"],
              div[class*="coin"],
              a[class*="button"]
          `);
          
          let targetButton = null;
          
          // לוגיקה משופרת לזיהוי כפתורים
          for (const button of allButtons) {
              const text = button.textContent.trim().toLowerCase();
              const ariaLabel = button.getAttribute('aria-label') || '';
              const title = button.getAttribute('title') || '';
              const allText = (text + ' ' + ariaLabel + ' ' + title).toLowerCase();
              
              if (
                  text.includes('כניסה') ||
                  text.includes('איסוף') ||
                  text.includes('collect') ||
                  text.includes('check') ||
                  text.includes('enter') ||
                  text.includes('sign in') ||
                  allText.includes('coin') ||
                  button.getAttribute('data-spm')?.includes('sign') ||
                  button.getAttribute('data-spm')?.includes('coin')
              ) {
                  targetButton = button;
                  console.log(`נמצא כפתור מתאים: "${text}"`);
                  break;
              }
          }
          
          if (targetButton) {
              console.log('מנסה ללחוץ על הכפתור בכמה דרכים...');
              
              // שיטה 1: Click רגיל
              targetButton.click();
              
              // שיטה 2: Mouse Events מדומים
              const events = ['mousedown', 'mouseup', 'click'];
              events.forEach(eventType => {
                  const event = new MouseEvent(eventType, {
                      view: window,
                      bubbles: true,
                      cancelable: true,
                      buttons: 1
                  });
                  targetButton.dispatchEvent(event);
              });
              
              // שיטה 3: Touch Events למובייל
              const touchEvent = new TouchEvent('touchstart', {
                  bubbles: true,
                  cancelable: true,
                  touches: [new Touch({
                      identifier: 0,
                      target: targetButton,
                      clientX: 0,
                      clientY: 0
                  })]
              });
              targetButton.dispatchEvent(touchEvent);
              
              // שיטה 4: Focus + Enter key
              if (targetButton.focus) {
                  targetButton.focus();
                  const enterEvent = new KeyboardEvent('keydown', {
                      key: 'Enter',
                      keyCode: 13,
                      bubbles: true
                  });
                  targetButton.dispatchEvent(enterEvent);
              }
              
              console.log('כל השיטות בוצעו - בודק תוצאה...');
              
              // המתנה קצרה לבדיקת תוצאה
              setTimeout(() => {
                  resolve(true);
              }, 1000);
              
          } else {
              console.log('לא נמצא כפתור מתאים');
              console.log('כפתורים זמינים:');
              allButtons.forEach((btn, index) => {
                  console.log(`${index}: "${btn.textContent.trim()}"`);
              });
              resolve(false);
          }
      }, 10000); // הגדלת זמן המתנה ל-10 שניות
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
