function updateTimezones() {
    const myTimezone = 'Asia/Jakarta';
    const myOffset = 7;
    
    const now = new Date();
    
    const myTime = new Date(now.toLocaleString('en-US', { timeZone: myTimezone }));
    const myTimeString = myTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
    });
    document.getElementById('myTime').textContent = myTimeString;
    document.getElementById('myTimezone').textContent = 'Jakarta, Indonesia (UTC+7)';
    
    const yourTime = new Date();
    const yourTimeString = yourTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
    });
    document.getElementById('yourTime').textContent = yourTimeString;
    
    const yourTimezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const yourOffsetInMinutes = -yourTime.getTimezoneOffset();
    const yourOffsetInHours = yourOffsetInMinutes / 60;
    
    let offsetText = 'UTC';
    if (yourOffsetInHours >= 0) {
        offsetText += '+' + yourOffsetInHours;
    } else {
        offsetText += yourOffsetInHours;
    }
    
    document.getElementById('yourTimezone').textContent = `${yourTimezoneName} (${offsetText})`;
    
    const difference = yourOffsetInHours - myOffset;
    const hoursDifferent = Math.abs(difference);
    
    if (difference === 0) {
        document.getElementById('timeDifference').textContent = "We're in the same timezone!";
    } else if (difference > 0) {
        document.getElementById('timeDifference').textContent = `You're ${hoursDifferent} hour${hoursDifferent > 1 ? 's' : ''} ahead of me`;
    } else {
        document.getElementById('timeDifference').textContent = `You're ${hoursDifferent} hour${hoursDifferent > 1 ? 's' : ''} behind me`;
    }
}

updateTimezones();
setInterval(updateTimezones, 1000);