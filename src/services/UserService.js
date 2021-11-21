import moment from "moment";
import firebase, {analytics, auth, firestore, storage} from "../firebase";
import {firebaseNames} from "../constants";

class UserService {

    static signUp = (fields) => {
        return new Promise((resolve, reject) => {
            if (!fields) {
                reject(new Error("No fields"));

                return;
            }

            const firstName = fields.firstName;
            const lastName = fields.lastName;
            const username = fields.username;
            const emailAddress = fields.emailAddress;
            const password = fields.password;

            if (!firstName || !lastName || !username || !emailAddress || !password) {
                reject(
                    new Error(
                        "No first name, last name, username, e-mail address, or password"
                    )
                );

                return;
            }

            if (auth.currentUser) {
                reject(new Error("No current user"));

                return;
            }

            auth
                .createUserWithEmailAndPassword(emailAddress, password)
                .then((value) => {
                    const user = value.user;

                    if (!user) {
                        reject(new Error("No user"));

                        return;
                    }

                    const uid = user.uid;

                    if (!uid) {
                        reject(new Error("No UID"));

                        return;
                    }

                    const userDocumentReference = firestore.collection("users").doc(uid);

                    userDocumentReference
                        .set({
                            firstName: firstName,
                            lastName: lastName,
                            username: username,
                        })
                        .then((value) => {
                            analytics.logEvent("sign_up", {
                                method: "password",
                            });

                            resolve(value);
                        })
                        .catch((reason) => {
                            reject(reason);
                        });
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static signUpWithEmailAddressAndPassword = (emailAddress, password) => {
        return new Promise((resolve, reject) => {
            if (!emailAddress || !password) {
                reject(new Error("No e-mail address or password"));

                return;
            }

            if (auth.currentUser) {
                reject(new Error("No current user"));

                return;
            }

            auth
                .createUserWithEmailAndPassword(emailAddress, password)
                .then((value) => {
                    const user = value.user;

                    if (!user) {
                        reject(new Error("No user"));

                        return;
                    }

                    const uid = user.uid;

                    if (!uid) {
                        reject(new Error("No UID"));

                        return;
                    }

                    const userDocumentReference = firestore.collection("users").doc(uid);

                    userDocumentReference
                        .set({}, {merge: true})
                        .then((value) => {
                            analytics.logEvent("sign_up", {
                                method: "password",
                            });

                            resolve(value);
                        })
                        .catch((reason) => {
                            reject(reason);
                        });
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static signIn = (emailAddress, password) => {
        return new Promise((resolve, reject) => {
            if (!emailAddress || !password) {
                reject(new Error("No e-mail address or password"));

                return;
            }

            if (auth.currentUser) {
                reject(new Error("No current user"));

                return;
            }

            auth
                .signInWithEmailAndPassword(emailAddress, password)
                .then((value) => {
                    const user = value.user;

                    if (!user) {
                        reject(new Error("No user"));

                        return;
                    }

                    const uid = user.uid;

                    if (!uid) {
                        reject(new Error("No UID"));

                        return;
                    }

                    const userDocumentReference = firestore.collection("users").doc(uid);

                    userDocumentReference
                        .get({source: "server"})
                        .then((value) => {
                            if (value.exists) {
                                analytics.logEvent("login", {
                                    method: "password",
                                });

                                resolve(user);
                            } else {
                                userDocumentReference
                                    .set({}, {merge: true})
                                    .then((value) => {
                                        analytics.logEvent("login", {
                                            method: "password",
                                        });

                                        resolve(user);
                                    })
                                    .catch((reason) => {
                                        reject(reason);
                                    });
                            }
                        })
                        .catch((reason) => {
                            reject(reason);
                        });
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static sendSignInLinkToEmail = (emailAddress) => {
        return new Promise((resolve, reject) => {
            if (!emailAddress) {
                reject(new Error("No e-mail address"));

                return;
            }

            if (auth.currentUser) {
                reject(new Error("No current user"));

                return;
            }

            const actionCodeSettings = {
                url: process.env.REACT_APP_HOMEPAGE,
                handleCodeInApp: true,
            };

            auth
                .sendSignInLinkToEmail(emailAddress, actionCodeSettings)
                .then((value) => {
                    analytics.logEvent("send_sign_in_link_to_email");

                    localStorage.setItem("emailAddress", emailAddress);

                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static signInWithEmailLink = (emailAddress, emailLink) => {
        return new Promise((resolve, reject) => {
            if (!emailAddress || !emailLink) {
                reject(new Error("No e-mail address or e-mail link"));

                return;
            }

            if (auth.currentUser) {
                reject(new Error("No current user"));

                return;
            }

            auth
                .signInWithEmailLink(emailAddress, emailLink)
                .then((value) => {
                    analytics.logEvent("login", {
                        method: "email-link",
                    });

                    localStorage.removeItem("emailAddress");

                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static signInWithAuthProvider = (provider) => {
        return new Promise((resolve, reject) => {
            if (!provider) {
                reject(new Error("No provider"));

                return;
            }

            const authProvider = new firebase.auth.OAuthProvider(provider.id);
            const scopes = provider.scopes;

            if (scopes) {
                scopes.forEach((scope) => {
                    authProvider.addScope(scope);
                });
            }

            if (auth.currentUser) {
                reject(new Error("No current user"));

                return;
            }

            auth
                .signInWithPopup(authProvider)
                .then((value) => {
                    const user = value.user;

                    if (!user) {
                        reject(new Error("No user"));

                        return;
                    }

                    const uid = user.uid;

                    if (!uid) {
                        reject(new Error("No UID"));

                        return;
                    }

                    const userDocumentReference = firestore.collection("users").doc(uid);

                    userDocumentReference
                        .get({source: "server"})
                        .then((value) => {
                            if (value.exists) {
                                analytics.logEvent("login", {
                                    method: provider.id,
                                });

                                resolve(user);
                            } else {
                                userDocumentReference
                                    .set({}, {merge: true})
                                    .then((value) => {
                                        analytics.logEvent("login", {
                                            method: provider.id,
                                        });

                                        resolve(user);
                                    })
                                    .catch((reason) => {
                                        reject(reason);
                                    });
                            }
                        })
                        .catch((reason) => {
                            reject(reason);
                        });
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static linkAuthProvider = (provider) => {
        return new Promise((resolve, reject) => {
            if (!provider) {
                reject(new Error("No provider"));

                return;
            }

            const authProvider = new firebase.auth.OAuthProvider(provider.id);
            const scopes = provider.scopes;

            if (scopes) {
                scopes.forEach((scope) => {
                    authProvider.addScope(scope);
                });
            }

            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));

                return;
            }

            currentUser
                .linkWithPopup(authProvider)
                .then((value) => {
                    analytics.logEvent("link_auth_provider", {
                        providerId: authProvider.id,
                    });

                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static unlinkAuthProvider = (providerId) => {
        return new Promise((resolve, reject) => {
            if (!providerId) {
                reject(new Error("No provider ID"));

                return;
            }

            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));

                return;
            }

            currentUser
                .unlink(providerId)
                .then((value) => {
                    analytics.logEvent("unlink_auth_provider", {
                        providerId: providerId,
                    });

                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static authProviderData = (providerId) => {
        if (!providerId) {
            return;
        }

        const currentUser = auth.currentUser;

        if (!currentUser) {
            return;
        }

        const providerData = currentUser.providerData;

        if (!providerData) {
            return;
        }

        return providerData.find((authProvider) => authProvider.providerId === providerId);
    };

    static signOut = () => {
        return new Promise((resolve, reject) => {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));

                return;
            }

            auth
                .signOut()
                .then((value) => {
                    analytics.logEvent("sign_out");

                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static resetPassword = (emailAddress) => {
        return new Promise((resolve, reject) => {
            if (!emailAddress) {
                reject(new Error("No e-mail address"));

                return;
            }

            if (auth.currentUser) {
                reject(new Error("No current user"));

                return;
            }

            auth
                .sendPasswordResetEmail(emailAddress)
                .then((value) => {
                    analytics.logEvent("reset_password");

                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static changeAvatar = (avatar) => {
        return new Promise((resolve, reject) => {
            if (!avatar) {
                reject(new Error("No avatar"));

                return;
            }

            const avatarFileTypes = [
                "image/gif",
                "image/jpeg",
                "image/png",
                "image/webp",
                "image/svg+xml",
            ];

            if (!avatarFileTypes.includes(avatar.type)) {
                reject(new Error("Invalid file type"));

                return;
            }

            if (avatar.size > 20 * 1024 * 1024) {
                reject(new Error("Invalid size"));

                return;
            }

            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));

                return;
            }

            const uid = currentUser.uid;

            if (!uid) {
                reject(new Error("No UID"));

                return;
            }

            const avatarReference = storage
                .ref()
                .child("images")
                .child("avatars")
                .child(uid);

            avatarReference
                .put(avatar)
                .then((uploadTaskSnapshot) => {
                    avatarReference
                        .getDownloadURL()
                        .then((value) => {
                            currentUser
                                .updateProfile({
                                    photoURL: value,
                                })
                                .then((value) => {
                                    analytics.logEvent("change_avatar");

                                    resolve(value);
                                })
                                .catch((reason) => {
                                    reject(reason);
                                });
                        })
                        .catch((reason) => {
                            reject(reason);
                        });
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static setAvatar = (photoURL) => {
        return new Promise((resolve, reject) => {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));

                return;
            }

            const uid = currentUser.uid;

            if (!uid) {
                reject(new Error("No UID"));

                return;
            }

            const userDocumentReference = firestore.collection("users").doc(uid);

            userDocumentReference
                .update({
                    avatar: photoURL,
                })
                .then((value) => {
                    analytics.logEvent("change_photoURL");

                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static removeAvatar = () => {
        return new Promise((resolve, reject) => {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));

                return;
            }

            const uid = currentUser.uid;

            if (!uid) {
                reject(new Error("No UID"));

                return;
            }

            currentUser
                .updateProfile({
                    photoURL: null,
                })
                .then((value) => {
                    const avatarReference = storage
                        .ref()
                        .child("images")
                        .child("avatars")
                        .child(uid);

                    avatarReference
                        .delete()
                        .then((value) => {
                            analytics.logEvent("remove_avatar");

                            resolve(value);
                        })
                        .catch((reason) => {
                            reject(reason);
                        });
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static changeFullName = (fullName) => {
        return new Promise((resolve, reject) => {
            if (!fullName) {
                reject(new Error("No first name"));

                return;
            }

            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));

                return;
            }

            const uid = currentUser.uid;

            if (!uid) {
                reject(new Error("No UID"));

                return;
            }

            const userDocumentReference = firestore.collection("users").doc(uid);

            userDocumentReference
                .update({
                    fullName: fullName,
                })
                .then((value) => {
                    analytics.logEvent("change_full_name");

                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static changeFirstName = (firstName) => {
        return new Promise((resolve, reject) => {
            if (!firstName) {
                reject(new Error("No first name"));

                return;
            }

            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));

                return;
            }

            const uid = currentUser.uid;

            if (!uid) {
                reject(new Error("No UID"));

                return;
            }

            const userDocumentReference = firestore.collection("users").doc(uid);

            userDocumentReference
                .update({
                    firstName: firstName,
                })
                .then((value) => {
                    analytics.logEvent("change_first_name");

                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static changeLastName = (lastName) => {
        return new Promise((resolve, reject) => {
            if (!lastName) {
                reject(new Error("No last name"));

                return;
            }

            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));

                return;
            }

            const uid = currentUser.uid;

            if (!uid) {
                reject(new Error("No UID"));

                return;
            }

            const userDocumentReference = firestore.collection("users").doc(uid);

            userDocumentReference
                .update({
                    lastName: lastName,
                })
                .then((value) => {
                    analytics.logEvent("change_last_name");

                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static changeUsername = (username) => {
        return new Promise((resolve, reject) => {
            if (!username) {
                reject(new Error("No username"));

                return;
            }

            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));

                return;
            }

            const uid = currentUser.uid;

            if (!uid) {
                reject(new Error("No UID"));

                return;
            }

            const userDocumentReference = firestore.collection("users").doc(uid);

            userDocumentReference
                .update({
                    username: username,
                })
                .then((value) => {
                    analytics.logEvent("change_username");

                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static changeEmailAddress = (emailAddress) => {
        return new Promise((resolve, reject) => {
            if (!emailAddress) {
                reject(new Error("No e-mail address"));

                return;
            }

            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));

                return;
            }

            const uid = currentUser.uid;

            if (!uid) {
                reject(new Error("No UID"));

                return;
            }

            currentUser
                .updateEmail(emailAddress)
                .then((value) => {
                    analytics.logEvent("change_email_address");

                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static changePassword = (password) => {
        return new Promise((resolve, reject) => {
            if (!password) {
                reject(new Error("No password"));

                return;
            }

            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));

                return;
            }

            const uid = currentUser.uid;

            if (!uid) {
                reject(new Error("No UID"));

                return;
            }

            currentUser
                .updatePassword(password)
                .then((value) => {
                    const userDocumentReference = firestore.collection("users").doc(uid);

                    userDocumentReference
                        .update({
                            lastPasswordChange: firebase.firestore.FieldValue.serverTimestamp(),
                        })
                        .then((value) => {
                            analytics.logEvent("change_password");

                            resolve(value);
                        })
                        .catch((reason) => {
                            reject(reason);
                        });
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static verifyEmailAddress = () => {
        return new Promise((resolve, reject) => {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));

                return;
            }

            currentUser
                .sendEmailVerification()
                .then((value) => {
                    analytics.logEvent("verify_email_address");

                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static deleteAccount = () => {
        return new Promise((resolve, reject) => {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));

                return;
            }

            currentUser
                .delete()
                .then((value) => {
                    analytics.logEvent("delete_account");

                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static getRoles = () => {
        return new Promise((resolve, reject) => {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));

                return;
            }

            currentUser
                .getIdTokenResult()
                .then((idTokenResult) => {
                    resolve(idTokenResult.claims.roles);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static isAdmin = () => {
        return new Promise((resolve, reject) => {
            UserService
                .getRoles()
                .then((value) => {
                    resolve(value.includes("admin"));
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static isPremium = () => {
        return new Promise((resolve, reject) => {
            UserService
                .getRoles()
                .then((value) => {
                    resolve(value.includes("premium"));
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static getName = (fields) => {
        if (!fields) {
            return null;
        }

        const firstName = fields.firstName;
        const username = fields.username;
        const displayName = fields.displayName;
        const lastName = fields.lastName;

        if (firstName) {
            return firstName;
        }

        if (username) {
            return username;
        }

        if (displayName) {
            return displayName;
        }

        if (lastName) {
            return lastName;
        }

        return null;
    };

    static getFullName = (fields) => {
        if (!fields) {
            return null;
        }

        const firstName = fields.firstName;
        const lastName = fields.lastName;
        const displayName = fields.displayName;

        if (firstName && lastName) {
            return `${firstName} ${lastName}`;
        }

        if (displayName) {
            return displayName;
        }

        return null;
    };

    static getNameInitials = (fields) => {
        if (!fields) {
            return null;
        }

        const firstName = fields.firstName;
        const lastName = fields.lastName;
        const username = fields.username;
        const displayName = fields.displayName;

        if (firstName && lastName) {
            return firstName.charAt(0) + lastName.charAt(0);
        }

        if (firstName) {
            return firstName.charAt(0);
        }

        if (username) {
            return username.charAt(0);
        }

        if (lastName) {
            return lastName.charAt(0);
        }

        if (displayName) {
            return displayName.charAt(0);
        }

        return null;
    };

    static getProfileCompletion = (fields) => {
        if (!fields) {
            return null;
        }

        fields = [
            fields.photoURL,
            fields.firstName,
            fields.lastName,
            fields.username,
            fields.email,
            fields.email && fields.emailVerified,
        ];

        if (!fields) {
            return null;
        }

        let profileCompletion = 0;

        fields.forEach((field) => {
            if (field) {
                profileCompletion += 100 / fields.length;
            }
        });

        return Math.floor(profileCompletion);
    };

    static getExpertProfileCompletion = (fields) => {
        if (!fields) {
            return null;
        }

        fields = [
            fields.expertServices,
            fields.expertSubjects,
            fields.expertPromo,
            fields.expertPortfolio,
        ];

        if (!fields) {
            return null;
        }

        let profileCompletion = 0;

        fields.forEach((field) => {
            if (field) {
                profileCompletion += 100 / fields.length;
            }
        });

        return Math.floor(profileCompletion);
    };

    static getSecurityRating = (user, userData) => {
        if (!user || !user.metadata) {
            return null;
        }

        let creationTime = user.metadata.creationTime;

        if (!creationTime) {
            return null;
        }

        creationTime = moment(creationTime);

        let securityRating = 0;

        if (userData && userData.lastPasswordChange) {
            let lastPasswordChange = userData.lastPasswordChange;

            if (lastPasswordChange) {
                lastPasswordChange = moment(lastPasswordChange.toDate());

                if (creationTime.diff(lastPasswordChange, "days") >= 365.242199) {
                    securityRating = 50;
                } else {
                    securityRating = 100;
                }
            }
        } else {
            if (moment().diff(creationTime, "days") >= 365.242199) {
                securityRating = 50;
            } else {
                securityRating = 100;
            }
        }

        return securityRating;
    };

    static updateProfile = (fields) => {
        return new Promise((resolve, reject) => {
            if (!fields) {
                reject(new Error("No fields"));
                return;
            }

            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));
                return;
            }

            const uid = currentUser.uid;

            if (!uid) {
                reject(new Error("No UID"));
                return;
            }

            const userDocumentReference = firestore.collection("users").doc(uid);

            userDocumentReference
                .update(fields)
                .then((res) => {
                    analytics.logEvent("update_profile");
                    resolve(res);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static addOrderIdToUser = (orderId) => {
        return new Promise((resolve, reject) => {
            if (!orderId) {
                reject(new Error("No order id"));
                return;
            }

            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));
                return;
            }

            const uid = currentUser.uid;

            if (!uid) {
                reject(new Error("No UID"));
                return;
            }

            const userDocumentReference = firestore.collection("users").doc(uid);

            userDocumentReference
                .update({
                    responses: firebase.firestore.FieldValue.arrayUnion(orderId)
                })
                .then((value) => {
                    analytics.logEvent("add_order_id_to_user");
                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };
}

export default UserService;
