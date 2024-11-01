class ContactsController < ApplicationController
  def create
    @contact = Contact.new(contact_params)

    if @contact.valid?
      ContactMailer.with(contact: @contact).send_contact_email.deliver_now
      redirect_to root_path
      # flash.alert = ""
    else
      # flash.notice = ""
      render 'pages/home', status: :unprocessable_entity
    end
  end

private
  def contact_params
    params.require(:contact).permit(:name, :email, :message)
  end
end
