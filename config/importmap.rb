# Pin npm packages by running ./bin/importmap

# config/importmap.rb

pin "application", to: "application.js"
pin "@hotwired/turbo-rails", to: "https://unpkg.com/@hotwired/turbo/dist/turbo.min.js"
pin "@hotwired/stimulus", to: "https://unpkg.com/@hotwired/stimulus/dist/stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "https://unpkg.com/@hotwired/stimulus-loading/dist/stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "portefolio", to: "portefolio.js"
# Pin your custom JavaScript file
