const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBorukwZKOeJaxEYqY57zL1W-8zjevQlhg",
  authDomain: "messages-9e5da.firebaseapp.com",
  projectId: "messages-9e5da",
  storageBucket: "messages-9e5da.firebasestorage.app",
  messagingSenderId: "1033254869246",
  appId: "1:1033254869246:web:9134daa1fe90389109adaf"
};

const ADMIN_PASSWORD = "rama338";

const CONFIG = {
  MAX_MESSAGE_LENGTH: 500,
  MAX_NAME_LENGTH: 50,
  MESSAGE_LIMIT: 100,
  PAGE_SIZE: 10,
  EMOJI_SPAWN_INTERVAL: 150,
  POPUP_DURATION: 3000,
  RATE_LIMIT_SECONDS: 30,
  BAD_WORDS: ["shit","fuck","bitch","asshole","dick","crap","piss"],
  STORAGE_KEYS: {
    THEME: "sd_theme",
    LAST_MESSAGE_TIME: "sd_last_msg",
    USER_IP: "sd_user_ip"
  }
};

export { FIREBASE_CONFIG, ADMIN_PASSWORD, CONFIG };
