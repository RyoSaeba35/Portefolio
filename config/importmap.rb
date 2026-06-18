# Pin npm packages by running ./bin/importmap

# config/importmap.rb

pin "application", to: "application.js"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "portefolio", to: "portefolio.js"
# Pin your custom JavaScript file
