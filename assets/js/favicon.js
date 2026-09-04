class Favicon {
    constructor(basePath = '/icons/') {
        this.basePath = basePath;
        
        this.original = {
            title: document.title,
            icon: document.querySelector("link[rel*='icon']")?.href,
            type: 'image/x-icon'
        };

        document.addEventListener('visibilitychange', () => this.handleVisibility());
    }

    get services() {
        return {
            calendar: () => {
                const day = new Date().getDate();
                return {
                    title: `Google Calendar - ${new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' })}`,
                    favicon: `${this.basePath}calendar_${day}.ico`,
                    type: 'image/x-icon'
                };
            },
            gmail: () => {
                const count = Math.floor(Math.random() * 10) + 1; 
                const displayCount = count === 10 ? '10+' : count;
                return {
                    title: `Inbox (${displayCount}) - root@davidfegyver.hu`,
                    favicon: `${this.basePath}gmail_${count}.png`,
                    type: 'image/png'
                };
            },
            gemini: () => ({
                title: "Google Gemini",
                favicon: `${this.basePath}gemini.svg`,
                type: 'image/svg+xml'
            }),
            github: () => ({
                title: "GitHub",
                favicon: `${this.basePath}github.svg`,
                type: 'image/svg+xml'
            }),
            youtube: () => ({
                title: "YouTube",
                favicon: `${this.basePath}youtube.png`,
                type: 'image/png'
            }),
            smile: () => ({
                title: "^^",
                favicon: `${this.basePath}smile.png`,
                type: 'image/png'
            })
        };
    }

    enable() {
        const keys = Object.keys(this.services);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const serviceData = this.services[randomKey]();
        
        this.updateDOM(serviceData);
    }

    disable() {
        this.updateDOM(this.original);
    }

    updateDOM({ title, favicon, type }) {
        document.title = title;

        const oldLinks = document.querySelectorAll("link[rel*='icon']");
        oldLinks.forEach(el => el.remove());

        const link = document.createElement('link');
        link.type = type;
        link.rel = 'shortcut icon';
        link.href = favicon;
        
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    handleVisibility() {
        if (document.hidden) {
            this.enable();
        } else {
            this.disable();
        }
    }
}

new Favicon('/icons/');