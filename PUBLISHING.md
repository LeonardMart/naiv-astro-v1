# How to Publish @leomart/clean-astro

Follow these steps to publish your package to NPM.

## Prerequisites
1.  **NPM Account**: You must have an account on [npmjs.com](https://www.npmjs.com/).
2.  **Login**: You must be logged in locally.
    ```bash
    npm login
    ```

## 1. Prepare for Release
Change to the package directory:
```bash
cd packages/leo-clean-astro
```

(Optional) Update the version number in `package.json` if you've made changes since the last version:
```bash
npm version patch
```

## 2. Publish
Run the publish command:
```bash
npm publish --access public
```

### Troubleshooting
- **403 Forbidden (2FA)**: If you possess 2FA enabled on NPM, you must provide your OTP code:
    ```bash
    npm publish --access public --otp 123456
    ```
- **403 Forbidden (Scope Permissions)**: Verify you are logged in (`npm whoami`) and that you own the scope `@leomart`.
- **402 Payment Required**: Scoped packages (`@scope/pkg`) default to private, which requires a paid account. The `--access public` flag (which we added to `package.json`) prevents this, but ensure you include it if running manually.

## 3. Using in Other Projects
Once published, you can install it in any Astro project:
```bash
npm install @leomart/clean-astro
```
