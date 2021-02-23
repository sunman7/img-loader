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
const Uploader = {
    add(file, fileName) {
        const item = new AV.Object("Image");
        const avFile = new AV.File(fileName, file);
        item.set("filename", fileName);
        item.set("owner", AV.User.current());
        item.set("url", avFile);
        return new Promise((resolve, reject) => {
                item.save().then((serverFile) => {
                        resolve(serverFile);
                    }, error => {
                        reject(error);
                    }
                );
            }
        );
    },
    find({page = 0, limit = 10}) {
        const query = new AV.Query("Image");
        query.include("owner");
        query.limit(limit);
        query.skip(page * limit);
        query.descending("createdAt");
        query.equalTo("owner", AV.User.current());
        return new Promise((resolve, reject) => {
            query.find()
                .then(results => {
                    resolve(results);
                }).catch(error => reject(error));
        });
    },
    remove(fileName) {
        const query = new AV.Query("Image");
        query.equalTo("owner", AV.User.current());
        query.equalTo("filename", fileName);
        return new Promise((resolve, reject) => {
            query.find()
                .then(results => {
                    const result = AV.Object.createWithoutData("Image", results[0].id);
                    resolve(result);
                    result.destroy();
                }).catch(err => reject(err));
        });
    }
};
export {Auth, Uploader};
