// تابع‌های کمکی برای مدیریت کوکی‌ها
export const setCookie = (name, value, days = 1) => {
    if (!value || value === 'undefined') {
        console.error(`Attempted to set invalid cookie value for ${name}:`, value);
        return;
    }

    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    const domain = window.location.hostname;
    const cookieString = `${name}=${value}; ${expires}; path=/; domain=${domain}; secure; samesite=strict`;
    
    console.log('Setting cookie:', { name, value, domain, expires });
    document.cookie = cookieString;
};

export const getCookie = (name) => {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            const value = cookie.substring(cookieName.length, cookie.length);
            console.log('Getting cookie:', { name, value });
            return value;
        }
    }
    return null;
};

export const deleteCookie = (name) => {
    const domain = window.location.hostname;
    const cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}; secure; samesite=strict`;
    console.log('Deleting cookie:', { name, domain });
    document.cookie = cookieString;
}; 