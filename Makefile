.PHONY: build test install-dependencies update-dependencies clean reconfigure audit

index.js: source/Inject.js
	@ docker run --rm \
	-v `pwd`:/app \
	-w="/app" \
	node:12.6.0-alpine \
		npm install \
		&& npx babel source --out-dir ./

test:
	@ docker run --rm \
	-v `pwd`:/app \
	-w="/app" \
	node:12.6.0-alpine \
		npm install \
		&& npx babel source test --out-dir ./ \
		&& node test.js

install-dependencies:
	@ docker run --rm \
	-v `pwd`:/app \
	-w="/app" \
	node:12.6.0-alpine \
		npm install

update-dependencies:
	@ docker run --rm \
	-v `pwd`:/app \
	-w="/app" \
	node:12.6.0-alpine \
		npm update

clean:
	@ docker run --rm \
	-v `pwd`:/app \
	-w="/app" \
	node:12.6.0-alpine \
		rm -rf node_modules *.js configure

audit:
	@ docker run --rm \
	-v `pwd`:/app \
	-w="/app" \
	node:12.6.0-alpine \
		npm audit

audit-fix:
	@ docker run --rm \
	-v `pwd`:/app \
	-w="/app" \
	node:12.6.0-alpine \
		npm audit fix
