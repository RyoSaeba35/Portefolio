# app/controllers/desktop/pages_controller.rb
class Desktop::PagesController < ApplicationController
  def about
    render partial: 'shared/about_section', locals: {}, status: :ok
  end

  def projects
    render partial: 'shared/projects_section', locals: {}, status: :ok
  end

  def contact
    render partial: 'shared/contact_section', locals: {}, status: :ok
  end
end
