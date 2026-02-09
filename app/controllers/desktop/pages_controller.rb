# app/controllers/desktop/pages_controller.rb
class Desktop::PagesController < ApplicationController
  def about
    render partial: 'shared/about_section'
  end

  def projects
    render partial: 'shared/projects_section'
  end

  def contact
    render partial: 'shared/contact_section'
  end
end
