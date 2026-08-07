# Publish Orbit Board with live accounts

## Files to upload

Upload these three files to the root of your GitHub repository:

- `index.html`
- `productivity-board.html`
- `firebase-config.js` (replace `null` with your Firebase Web App configuration)

Do not upload the `.git` folder. The `index.html` file opens the board automatically.

## 1. Create the Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project.
2. On the project overview page, click the web (`</>`) icon to add a Web App. Give it a name such as `Orbit Board`.
3. Firebase will show a JavaScript configuration object. Replace the `null` in `firebase-config.js` with that object. `firebase-config.example.js` shows the required format.
4. In **Authentication** → **Sign-in method**, enable **Email/Password**.
5. In **Firestore Database**, click **Create database**. Choose a production database location close to your users.

## 2. Secure each user's tasks

In **Firestore Database** → **Rules**, replace the rules with the following and click **Publish**:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/tasks/{taskId} {
      allow read, create, update, delete: if request.auth != null
        && request.auth.uid == userId;
    }
  }
}
```

These rules mean a signed-in user can read and change only their own tasks.

## 3. Upload and activate GitHub Pages

1. Create a GitHub repository named `orbitboard`, or rename the existing one to that name.
2. Upload the three files above to the repository root and commit them to the `main` branch.
3. In GitHub, open **Settings** → **Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main`, select `/ (root)`, and save.
4. Your site will be available at `https://YOUR-GITHUB-USERNAME.github.io/orbitboard/`.

## 4. Let Firebase accept your live site

In Firebase Console, go to **Authentication** → **Settings** → **Authorized domains** and add `YOUR-GITHUB-USERNAME.github.io`.

Open the published website, choose **Sign in** → **Create an account**, and use an email address and a password of at least six characters. The same login on another device loads the same private task board.

## Custom address (optional)

To use an address such as `orbitboard.com`, buy or use an existing domain, then add it in GitHub **Settings** → **Pages** → **Custom domain**. Follow GitHub's DNS instructions at your domain provider. The site code does not need to change.
