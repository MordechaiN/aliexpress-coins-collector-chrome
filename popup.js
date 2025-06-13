/**
 * @author Mordechai Neeman
 * @copyright 2025
 * @license Custom License
 * @see https://github.com/MordechaiN/aliexpress-coins-collector-chrome
 */

document.addEventListener('DOMContentLoaded', function() {
  // אלמנטים
  const statusElement = document.getElementById('status');
  const nextRunElement = document.getElementById('nextRun');
  const loggingStatusElement = document.getElementById('loggingStatus');
  const themeToggle = document.getElementById('themeToggle');
  const testRunBtn = document.getElementById('testRun');
  const toggleLoggingBtn = document.getElementById('toggleLogging');
  const loggingText = document.getElementById('loggingText');  
  // טעינה ראשונית
  loadStatus();
  loadTheme();
  loadAnalytics();
  
  // מאזינים
  themeToggle.addEventListener('click', toggleTheme);
  testRunBtn.addEventListener('click', runTest);
  toggleLoggingBtn.addEventListener('click', toggleLogging);
  
  document.getElementById('showCredits').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('credits.html') });
  });

  // כפתורי הצגה/הסתרה
  document.getElementById('manageLinks').addEventListener('click', () => toggleSection('linksContainer'));
  document.getElementById('showAnalytics').addEventListener('click', () => toggleSection('analyticsContainer'));
  document.getElementById('showLogs').addEventListener('click', () => toggleSection('logsContainer'));

  // מאזינים לניהול לינקים
  document.getElementById('addLink').addEventListener('click', addNewLink);
  document.getElementById('exportLinks').addEventListener('click', exportLinks);
  document.getElementById('importLinks').addEventListener('click', importLinks);
  document.getElementById('resetStats').addEventListener('click', resetAnalytics);

  // מאזין ל-Enter בשדה הלינק החדש
  document.getElementById('newLinkInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addNewLink();
    }
  });

  // פונקציות
  function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const isVisible = section.classList.contains('show');
    
    // סגור את כל הסקשנים
    document.querySelectorAll('.expandable').forEach(el => el.classList.remove('show'));
    
    if (!isVisible) {
      section.classList.add('show');
      if (sectionId === 'linksContainer') loadLinks();
      if (sectionId === 'analyticsContainer') loadAnalytics();
      if (sectionId === 'logsContainer') loadLogs();
    }
  }

  function loadTheme() {
    chrome.storage.sync.get(['darkMode'], (result) => {
      const isDark = result.darkMode || false;
      document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
    });
  }

  function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    chrome.storage.sync.set({ darkMode: newTheme === 'dark' });
  }

  function loadStatus() {
    chrome.runtime.sendMessage({ action: 'getStatus' }, (response) => {
      if (response) {
        statusElement.textContent = response.currentProcessing ? 'רץ עכשיו' : 'ממתין';
        nextRunElement.textContent = new Date(response.nextRun).toLocaleString('he-IL');
        loggingStatusElement.textContent = response.isLoggingEnabled ? 'פעיל' : 'כבוי';
        loggingButtonText.textContent = response.isLoggingEnabled ? 'כבה לוג' : 'הפעל לוג';
        testRunBtn.disabled = response.currentProcessing;
      }
    });
  }

  function loadAnalytics() {
    chrome.runtime.sendMessage({ action: 'getAnalytics' }, (response) => {
      if (response && response.analytics) {
        const analytics = response.analytics;
        const today = analytics.today || { successful: 0, total: 0 };
        
        document.getElementById('todaySuccess').textContent = today.successful;
        document.getElementById('totalCoins').textContent = analytics.total?.coins || 0;
        document.getElementById('streak').textContent = analytics.total?.streak || 0;
        
        const weeklyAvg = analytics.weekly?.length > 0 ? 
          Math.round(analytics.weekly.reduce((sum, day) => sum + (day.successRate || 0), 0) / analytics.weekly.length) : 0;
        document.getElementById('weeklyAverage').textContent = weeklyAvg + '%';
        
        const successRate = today.total > 0 ? Math.round((today.successful / today.total) * 100) : 0;
        document.getElementById('successProgress').style.width = successRate + '%';
        document.getElementById('successPercentage').textContent = successRate + '%';
      }
    });
  }

  function runTest() {
    testRunBtn.disabled = true;
    testRunBtn.textContent = 'רץ...';
    
    chrome.runtime.sendMessage({ action: 'testRun' }, (response) => {
      if (response && response.success) {
        alert('בדיקה התחילה! בדוק את הלוגים לעדכונים.');
      } else {
        alert('לא ניתן להפעיל בדיקה: ' + (response?.message || 'שגיאה לא ידועה'));
      }
      
      setTimeout(() => {
        testRunBtn.disabled = false;
        testRunBtn.textContent = '🚀 הפעל בדיקה עכשיו';
        loadStatus();
        loadAnalytics();
      }, 2000);
    });
  }

  function toggleLogging() {
    chrome.runtime.sendMessage({ action: 'toggleLogging' }, (response) => {
      if (response) {
        loggingStatusElement.textContent = response.isLoggingEnabled ? 'פעיל' : 'כבוי';
        loggingButtonText.textContent = response.isLoggingEnabled ? 'כבה לוג' : 'הפעל לוג';
      }
    });
  }

  function loadLinks() {
    chrome.runtime.sendMessage({ action: 'getLinks' }, (response) => {
      if (response && response.links) {
        displayLinks(response.links);
      }
    });
  }

  function displayLinks(links) {
    const linksList = document.getElementById('linksList');
    const linksCount = document.getElementById('linksCount');
    
    linksList.innerHTML = '';
    linksCount.textContent = links.length;
    
    links.forEach((link, index) => {
      const linkItem = document.createElement('div');
      linkItem.className = 'link-item';
      
      const linkUrl = document.createElement('div');
      linkUrl.className = 'link-url';
      linkUrl.textContent = link.length > 50 ? link.substring(0, 50) + '...' : link;
      linkUrl.title = link;
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'מחק';
      deleteBtn.onclick = () => deleteLink(index);
      
      linkItem.appendChild(linkUrl);
      linkItem.appendChild(deleteBtn);
      linksList.appendChild(linkItem);
    });
  }

  function addNewLink() {
    const newLinkInput = document.getElementById('newLinkInput');
    const newLink = newLinkInput.value.trim();
    
    if (!newLink) {
      alert('אנא הזן לינק');
      return;
    }
    
    if (!newLink.includes('aliexpress.com')) {
      alert('אנא הזן לינק תקין של AliExpress');
      return;
    }
    
    chrome.runtime.sendMessage({ 
      action: 'addLink', 
      link: newLink 
    }, (response) => {
      if (response && response.success) {
        newLinkInput.value = '';
        loadLinks();
        alert('לינק נוסף בהצלחה!');
      } else {
        alert('שגיאה בהוספת הלינק: ' + (response?.message || 'שגיאה לא ידועה'));
      }
    });
  }

  function deleteLink(index) {
    if (confirm('האם אתה בטוח שברצונך למחוק את הלינק?')) {
      chrome.runtime.sendMessage({ 
        action: 'deleteLink', 
        index: index 
      }, (response) => {
        if (response && response.success) {
          loadLinks();
          alert('לינק נמחק בהצלחה!');
        } else {
          alert('שגיאה במחיקת הלינק');
        }
      });
    }
  }

  function exportLinks() {
    chrome.runtime.sendMessage({ action: 'getLinks' }, (response) => {
      if (response && response.links) {
        const timestamp = new Date().toLocaleString('he-IL');
        let linksText = `AliExpress Coins Collector - ייצוא לינקים\n`;
        linksText += `נוצר על ידי: מרדכי נאמן\n`;
        linksText += `תאריך: ${timestamp}\n`;
        linksText += `${'='.repeat(60)}\n\n`;
        
        response.links.forEach((link, index) => {
          linksText += `┌─ לינק מספר ${index + 1} ─┐\n`;
          linksText += `│ ${link}\n`;
          linksText += `└${'─'.repeat(50)}┘\n\n`;
        });
        
        linksText += `${'='.repeat(60)}\n`;
        linksText += `סה"כ לינקים: ${response.links.length}\n`;
        linksText += `תודה על השימוש בתוסף! 🙏`;
        
        const blob = new Blob([linksText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'aliexpress_links.txt';
        a.click();
        
        URL.revokeObjectURL(url);
        alert('לינקים יוצאו בהצלחה!');
      }
    });
  }

  function importLinks() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          const links = content.split('\n')
            .map(link => link.trim())
            .filter(link => link && link.includes('aliexpress.com'));
          
          if (links.length > 0) {
            chrome.runtime.sendMessage({ 
              action: 'importLinks', 
              links: links 
            }, (response) => {
              if (response && response.success) {
                loadLinks();
                alert(`${links.length} לינקים יובאו בהצלחה!`);
              } else {
                alert('שגיאה בייבוא הלינקים');
              }
            });
          } else {
            alert('לא נמצאו לינקים תקינים של AliExpress בקובץ');
          }
        };
        reader.readAsText(file);
      }
    };
    
    input.click();
  }

  function loadLogs() {
    chrome.runtime.sendMessage({ action: 'getLogs' }, (response) => {
      if (response && response.logs) {
        const logsList = document.getElementById('logsList');
        logsList.innerHTML = '';
        response.logs.slice(-20).forEach(log => {
          const logEntry = document.createElement('div');
          logEntry.className = 'log-entry';
          logEntry.textContent = log;
          logsList.appendChild(logEntry);
        });
        logsList.scrollTop = logsList.scrollHeight;
      }
    });
  
    // רענון אוטומטי כל 5 שניות כשהחלון פתוח
    if (document.getElementById('logsContainer').classList.contains('show')) {
      setTimeout(loadLogs, 5000);
    }
  }

  function resetAnalytics() {
    if (confirm('האם אתה בטוח שברצונך לאפס את כל הסטטיסטיקות?')) {
      chrome.runtime.sendMessage({ action: 'resetAnalytics' }, (response) => {
        if (response && response.success) {
          alert('סטטיסטיקות אופסו בהצלחה!');
          loadAnalytics();
        }
      });
    }
  }
  
  // רענון כל 10 שניות
  setInterval(() => {
    loadStatus();
    loadAnalytics();
  }, 10000);
});
