rm -rf dist &&
yarn build &&
cd build &&
git init &&
git add . &&
git commit -m "update" &&
git branch -M master &&
git remote add origin git@gitee.com:liamhuangzzz/img-uploader.git&&
git push -f -u origin master&&
cd -
