// Analytics service for tracking user interactions and page views
// In production, integrate with Google Analytics, Mixpanel, or similar

class AnalyticsService {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
    this.initializeTracking();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getUserId() {
    let userId = localStorage.getItem('analytics_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('analytics_user_id', userId);
    }
    return userId;
  }

  initializeTracking() {
    // Track page views
    this.trackPageView();

    // Track visibility
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.trackEvent('engagement', 'page_exit', window.location.pathname);
      } else {
        this.trackEvent('engagement', 'page_enter', window.location.pathname);
      }
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        this.trackEvent('engagement', 'scroll_depth', `${scrollPercent}%`, scrollPercent);
      }
    });

    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      this.trackEvent('engagement', 'time_on_page', window.location.pathname, timeOnPage);
    });
  }

  trackPageView(page) {
    const currentPage = page || window.location.pathname;
    this.trackEvent('navigation', 'page_view', currentPage);
  }

  trackEvent(category, action, label, value) {
    const event = {
      event: `${category}_${action}`,
      category,
      action,
      label,
      value,
      userId: this.userId,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      language: navigator.language,
      referrer: document.referrer
    };

    this.events.push(event);

    // In production, send to external analytics service
    console.log('Analytics Event:', event);

    this.storeEvent(event);
  }

  trackClick(element, location) {
    this.trackEvent('interaction', 'click', `${element}${location ? `_${location}` : ''}`);
  }

  trackFormSubmission(formName, success = true) {
    this.trackEvent('form', success ? 'submit_success' : 'submit_error', formName);
  }

  trackDownload(fileName) {
    this.trackEvent('download', 'file_download', fileName);
  }

  trackOutboundLink(url) {
    this.trackEvent('navigation', 'outbound_link', url);
  }

  trackSearch(query, results) {
    this.trackEvent('search', 'query', query, results);
  }

  trackProjectView(projectName) {
    this.trackEvent('project', 'view', projectName);
  }

  trackLanguageChange(from, to) {
    this.trackEvent('settings', 'language_change', `${from}_to_${to}`);
  }

  trackThemeChange(theme) {
    this.trackEvent('settings', 'theme_change', theme);
  }

  storeEvent(event) {
    try {
      const storedEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      storedEvents.push(event);

      if (storedEvents.length > 1000) {
        storedEvents.splice(0, storedEvents.length - 1000);
      }

      localStorage.setItem('analytics_events', JSON.stringify(storedEvents));
    } catch (error) {
      console.error('Failed to store analytics event:', error);
    }
  }

  getStoredEvents() {
    try {
      return JSON.parse(localStorage.getItem('analytics_events') || '[]');
    } catch (error) {
      console.error('Failed to retrieve analytics events:', error);
      return [];
    }
  }

  getSessionData() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      events: this.events,
      totalEvents: this.events.length
    };
  }

  generateInsights() {
    const events = this.getStoredEvents();
    const pageViews = events.filter(e => e.action === 'page_view');
    const uniquePages = [...new Set(pageViews.map(e => e.page))];

    return {
      totalEvents: events.length,
      totalPageViews: pageViews.length,
      uniquePages: uniquePages.length,
      topPages: this.getTopPages(pageViews),
      averageTimeOnSite: this.getAverageTimeOnSite(events),
      deviceInfo: this.getDeviceInfo(events),
      languageDistribution: this.getLanguageDistribution(events)
    };
  }

  getTopPages(pageViews) {
    const pageCounts = pageViews.reduce((acc, event) => {
      acc[event.page] = (acc[event.page] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(pageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([page, views]) => ({ page, views }));
  }

  getAverageTimeOnSite(events) {
    const timeEvents = events.filter(e => e.action === 'time_on_page' && e.value);
    if (timeEvents.length === 0) return 0;

    const totalTime = timeEvents.reduce((sum, e) => sum + (e.value || 0), 0);
    return Math.round(totalTime / timeEvents.length);
  }

  getDeviceInfo(events) {
    const devices = events.map(e => {
      const ua = e.userAgent.toLowerCase();
      if (ua.includes('mobile')) return 'Mobile';
      if (ua.includes('tablet')) return 'Tablet';
      return 'Desktop';
    });

    const counts = devices.reduce((acc, d) => {
      acc[d] = (acc[d] || 0) + 1;
      return acc;
    }, {});

    const total = devices.length;
    return Object.entries(counts).map(([type, count]) => ({
      type,
      percentage: Math.round((count / total) * 100)
    }));
  }

  getLanguageDistribution(events) {
    const languages = events.map(e => e.language);
    const langCounts = languages.reduce((acc, lang) => {
      acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(langCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([language, count]) => ({ language, count }));
  }
}

export const analytics = new AnalyticsService();
export default analytics;
