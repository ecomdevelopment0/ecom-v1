import Cookies from "js-cookie";

interface ILocalStorageProvider {
  get(local_key: string): any;
  save(local_key: string, data: any): void;
  remove(local_key: string): void;
}

interface ISessionProvider {
  get(session_key: string): any;
  save(session_key: string, data: any): void;
  remove(session_key: string): void;
}

interface ICookiesProvider {
  get: (cookie_key: string) => string | undefined;
  save: (cookie_key: string, token: string) => void;
  remove: (cookie_key: string) => void;
}

export const localStorageProvider: ILocalStorageProvider = {
  get(local_key: string) {
    try {
      const storedValue = localStorage.getItem(local_key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error("Error in getting value from local storage: ", error);
      return null;
    }
  },
  save(local_key: string, data: any): void {
    try {
      const prevData = localStorageProvider.get(local_key) || {};
      localStorage.setItem(local_key, JSON.stringify({ ...prevData, ...data }));
    } catch (error) {
      console.error("Error in saving value from local storage: ", error);
    }
  },
  remove(local_key: string) {
    try {
      localStorage.removeItem(local_key);
    } catch (error) {
      console.error("Error in removing value from local storage: ", error);
    }
  },
};

export const sessionProvider: ISessionProvider = {
  get(session_key: string) {
    try {
      return JSON.parse(sessionStorage.getItem(session_key) || "{}");
    } catch (error) {
      console.error("Error in getting value from Session storage: ", error);
    }
  },
  save(session_key: string, data: any) {
    try {
      const existingSessionData = sessionProvider.get(session_key);
      const mergedSessionData = { ...existingSessionData, ...data };
      sessionStorage.setItem(session_key, JSON.stringify(mergedSessionData));
    } catch (error) {
      console.error("Error in saving value from Session storage: ", error);
    }
  },
  remove(session_key: string) {
    try {
      sessionStorage.removeItem(session_key);
    } catch (error) {
      console.error("Error in removing value from Session storage: ", error);
    }
  },
};

export const CookiesProvider: ICookiesProvider = {
  get(cookie_key: string) {
    try {
      return Cookies.get(cookie_key);
    } catch (error) {
      console.error("Error in getting value from Cookies: ", error);
    }
  },
  save(cookie_key: string, token: string) {
    try {
      Cookies.set(cookie_key, token, {
        secure: true,
        httpOnly: true,
        sameSite: "Strict",
      });
    } catch (error) {
      console.error("Error in saving value from Cookies: ", error);
    }
  },
  remove(cookie_key: string) {
    try {
      Cookies.remove(cookie_key);
    } catch (error) {
      console.error("Error in removing value from Cookies: ", error);
    }
  },
};
