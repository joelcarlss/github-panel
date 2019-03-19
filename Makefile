phony:
	echo "Hej"

deployhosting:
	yarn run build
	firebase deploy --only hosting

deploy:
	yarn run build
	firebase deploy

deployhook:
	firebase deploy --only functions:onWebhook

i:
	npm install

.PHONY: phony $(MAKECMDGOALS)