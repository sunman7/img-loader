import AV, {Query, User} from "leancloud-storage";


AV.init({
    appId: "1g3260UniFq6U8h8gqjUt8FJ-gzGzoHsz",
    appKey: "a8O0iUpeTDfkX4JDgAReMmil",
    serverURL: "https://1g3260un.lc-cn-n1-shared.com"
});

const Auth = {
    register(username, password) {
        const user = new User();
        user.setUsername(username);
        user.setPassword(password);
        return new Promise((resolve, reject) => {
            user.signUp().then((user) => resolve(user), (error) => reject(error));
        });
    },
    login(username, password) {
        return new Promise((resolve, reject) => {
            User.logIn(username, password).then(user => resolve(user), error => reject(error));
        });
    },
    logout() {
        User.logOut();
    },
    getCurrentUser() {
        return User.current();
    }
};

export default Auth;
