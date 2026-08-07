# Publish Orbit Board with live accounts

## Files to upload

Upload these four files to the root of your GitHub repository:

- `index.html`
- `productivity-board.html`
- `firebase-config.js` (already contains the Orbit Board Firebase project config)
- `firestore.rules` (the security rules that keep each user's data private)

Do not upload the `.git` folder. The `index.html` file opens the board automatically.

## 1. Create the Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project.
2. On the project overview page, click the web (`</>`) icon to add a Web App. Give it a name such as `Orbit Board`.
3. Firebase will show a JavaScript configuration object. Replace the `null` in `firebase-config.js` with that object. `firebase-config.example.js` shows the required format.
4. In **Authentication** → **Sign-in method**, enable **Email/Password**.
5. In **Firestore Database**, click **Create database**. Choose a production database location close to your users.

## 2. Secure each user's tasks

The board already writes every task under `users/{your-uid}/tasks`, and `firestore.rules` makes sure no one can touch another person's data. The rules file is included in this project — use it two ways:

- **Easiest:** open `firestore.rules` in a text editor, copy its contents, then in **Firestore Database** → **Rules**, paste them and click **Publish**.
- **With the Firebase CLI:** run `firebase deploy --only firestore:rules` from this folder.

For reference, the rules are:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/tasks/{taskId} {
      allow read, create, update, delete: if request.auth != null
        && request.auth.uid == userId;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

These rules mean a signed-in user can read and change only their own tasks, and everything else (including other users' documents and the list of users) is denied. Until you publish these rules, Firestore may be in test mode where any visitor can read or edit any task — so publish them before sharing the site.

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
