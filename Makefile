.PHONY: build test install-dependencies update-dependencies clean audit audit-fix

NODE=docker run --rm \
	-v `pwd`:/app \
	-w="/app" \
	node:12.6.0-alpine

index.js: source/Inject.js
	@ ${NODE} \
		npm install -s \
		&& npx babel source --out-dir ./

test:
	@ ${NODE} \
		npm install -s \
		&& npx babel source test --out-dir ./ \
		&& node test.js

install-dependencies:
	@ ${NODE} \
		npm install

update-dependencies:
	@ ${NODE} \
		npm update

clean:
	@ ${NODE} \
		rm -rf node_modules *.js

audit:
	@ ${NODE} \
		npm audit

audit-fix:
	@ ${NODE} \
		npm audit fix
