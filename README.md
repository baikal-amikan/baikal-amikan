# Baikal-Amikan
## React + TypeScript + Vite

To modify the app locally 
```bash
npm i --prefix app
npm run --prefix app dev
```

To deploy new version of the app
```bash
npm run --prefix app build
npm run --prefix app preview  # to check the build

# commit the changes and push to the repo
git add .
git commit -am "version 1.2.1"
git push
```
