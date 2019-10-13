.PHONY: build build-test install update test clean hooks

build:
	@ npx babel source --out-dir .

build-test:
	@ npx babel source test --out-dir .

install:
	@ npm install

update:
	@ npm update

test:
	@ node test.js

clean:
	@ rm -rf node_modules *.js

hooks:
	git config core.hooksPath .githooks

# .PHONY: build test install-dependencies update-dependencies clean audit audit-fix

# NODE=docker run --rm \
# 	-v `pwd`:/app \
# 	-w="/app" \
# 	node:12.6.0-alpine

# build: source/Inject.js
# 	@ ${NODE} \
# 		make install-dependencies \
# 		&& npx babel source --out-dir ./

# test:
# 	@ ${NODE} \
# 		make install-dependencies \
# 		&& npx babel source test --out-dir ./ \
# 		&& node test.js

# install-dependencies: package.json
# 	@ ${NODE} \
# 		npm install

# update-dependencies: package.json
# 	@ ${NODE} \
# 		npm update

# clean:
# 	@ ${NODE} \
# 		rm -rf node_modules *.js

# audit:
# 	@ ${NODE} \
# 		npm audit

# audit-fix:
# 	@ ${NODE} \
# 		npm audit fix
