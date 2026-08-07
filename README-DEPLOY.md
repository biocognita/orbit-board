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

Every task lives under `users/{your-uid}/tasks`, and `firestore.rules` does two jobs:

- **Isolation:** a signed-in user can read and change only their own tasks — nobody else's, whether signed in or not.
- **Validation:** a task document must contain exactly the app's fields (`id`, `title`, `dueDate`, `type`, `createdAt`) with the right types and sizes. Users can't stuff junk or oversized data into even their own documents.

The rules only take effect once you publish them to your Firebase project:

- **Easiest — Firebase Console:** open `firestore.rules` in a text editor, copy its entire contents, then go to **Firestore Database** → **Rules**, replace everything in the editor, and click **Publish**.
- **With the Firebase CLI:** from this folder, create a `firebase.json` containing `{ "firestore": { "rules": "firestore.rules" } }`, then run:

  ```bash
  npm install -g firebase-tools
  firebase login
  firebase deploy --only firestore:rules
  ```

The rules are:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/tasks/{taskId} {
      allow read, delete: if request.auth != null
        && request.auth.uid == userId;

      allow create: if request.auth != null
        && request.auth.uid == userId
        && request.resource.data.keys().hasOnly(['id', 'title', 'dueDate', 'type', 'createdAt'])
        && request.resource.data.id is string && request.resource.data.id.size() <= 64
        && request.resource.data.title is string && request.resource.data.title.size() <= 120
        && request.resource.data.dueDate is string
        && request.resource.data.dueDate.size() == 10
        && request.resource.data.dueDate >= '2000-01-01'
        && request.resource.data.dueDate <= '2099-12-31'
        && request.resource.data.type is string
        && request.resource.data.type in ['Homework', 'Quiz/Exam', 'Event']
        && request.resource.data.createdAt is number;

      allow update: if request.auth != null
        && request.auth.uid == userId
        && request.resource.data.keys().hasOnly(['id', 'title', 'dueDate', 'type', 'createdAt'])
        && request.resource.data.id is string && request.resource.data.id.size() <= 64
        && request.resource.data.title is string && request.resource.data.title.size() <= 120
        && request.resource.data.dueDate is string
        && request.resource.data.dueDate.size() == 10
        && request.resource.data.dueDate >= '2000-01-01'
        && request.resource.data.dueDate <= '2099-12-31'
        && request.resource.data.type is string
        && request.resource.data.type in ['Homework', 'Quiz/Exam', 'Event']
        && request.resource.data.createdAt is number;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Until you publish these rules, Firestore may be in test mode where any visitor can read or edit any task — publish them before sharing the site.

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
