export default {
  validateUsername: (username) => {
    // Check the length of the username

    if (username.length < 6) {
      //   errorMeta = {
      //     username: { msg: "Username too short, must be above 6 characters" },
      //   };
      return {
        success: false,
        errorMeta: {
          username: { msg: "Username too short, must be above 6 characters" },
        },
      };
    }

    // Check if the username contains only alphanumeric characters
    const alphanumeric = /^[0-9a-zA-Z]+$/;
    if (!alphanumeric.test(username)) {
      //   errorMeta = {
      //     username: { msg: "Username must contain only alphanumeric characters" },
      //   };

      return {
        success: false,
        errorMeta: {
          username: {
            msg: "Username must contain only alphanumeric characters",
          },
        },
      };
    }

    // Check if the username is not already taken by another user in the system
    const takenUsernames = ["user1", "user2", "user3"]; // Replace with actual usernames in the system
    if (takenUsernames.includes(username)) {
      //   errorMeta = { username: { msg: "Username is taken" } };

      return {
        success: false,
        errorMeta: {
          username: { msg: "Username is taken" },
        },
      };
    }

    // If the username passes all these checks, it can be considered a correct username
    return { success: true, errorMeta: {} };
  },
  validatePassword: (password) => {
    // Check the length of the password
    if (password.length < 8) {
      //   errorMeta.password = { msg: "password too short" };
      return {
        success: false,
        errorMeta: {
          password: { msg: "password too short" },
        },
      };
    }

    // Check if the password contains at least one uppercase letter, one lowercase letter, and one digit
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const digit = /[0-9]/;
    if (
      !uppercase.test(password) ||
      !lowercase.test(password) ||
      !digit.test(password)
    ) {
      //   errorMeta.password = {
      //     msg: "Password must contains at least: one uppercase letter, one lowercase letter, and one digit",
      //   };
      //   return {
      //     success: false,
      //     errorMeta: {
      //       password: {
      //         msg: "Password must contains at least: one uppercase letter, one lowercase letter, and one digit",
      //       },
      //     },
      //   };
      return {
        success: true,
        errorMeta: {},
      };
    }

    // If the password passes all these checks, it can be considered a valid password
    return {
      success: true,
      errorMeta: {},
    };
  },

  validateEmail: (email) => {
    // Check if email has a valid format
    const emailFormat = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailFormat.test(email)) {
      //   errorMeta.email = { msg: "Invalid email" };
      //   return {
      //     success: false,
      //     errorMeta: {
      //       email: {
      //         msg: "Invalid email",
      //       },
      //     },
      //   };
      return {
        success: true,
        errorMeta: {},
      };
    }

    // If the email passes this check, it can be considered a valid email address
    return {
      success: true,
      errorMeta: {},
    };
  },
  validateBio: (bio) => {
    if (bio?.length < 5) {
      //   errorMeta.bio = { msg: "Bio is too short!" };
      return {
        success: true,
        errorMeta: { bio: { msg: "Bio is too short!" } },
      };
    }

    // If the email passes this check, it can be considered a valid email address
    return {
      success: true,
      errorMeta: {},
    };
  },
};
