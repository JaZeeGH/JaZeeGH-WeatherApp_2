import {userStore} from "../models/user-store.js";

export const accountsController = {
    index(request, response) {
        const viewData = {
            title: "Login or Signup",
        };
        response.render("index", viewData);
    },

    login(request, response) {
        const viewData = {
            title: "Login to the Service",
        };
        response.render("login-view", viewData);
    },

    logout(request, response) {
        response.cookie("stations", "");
        response.redirect("/");
    },

    signup(request, response) {
        const viewData = {
            title: "Login to the Service",
        };
        response.render("signup-view", viewData);
    },

    async register(request, response) {
        const user = request.body;
        await userStore.addUser(user);
        console.log(`registering ${user.email}`);
        response.redirect("/");
    },

    async authenticate(request, response) {
        const user = await userStore.getUserByEmail(request.body.email);
        if (user) {
            response.cookie("stations", user.email);
            console.log(`logging in ${user.email}`);
            response.redirect("/dashboard");
        } else {
            response.redirect("/login");
        }
    },

    async getLoggedInUser(request) {
        const userEmail = request.cookies.stations;
        return await userStore.getUserByEmail(userEmail);
    },

    async userView(request, response) { //providing current loggedin user view under User Account Tab
        const user = await accountsController.getLoggedInUser(request);
        const email = request.cookies.stations;

        const viewData = {
            title: "User Account",
            user: user,
            email: email,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        console.log("account rendering");
        response.render("account-view", viewData);
    },

    async updateUser(request, response) { //updating the currently logged in user account
        const userId = request.params.id;
        const updatedUser = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password,
        };

        await userStore.updateUser(userId, updatedUser);
        response.redirect("/login");
    },
};