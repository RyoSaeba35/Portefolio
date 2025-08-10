class ContactsController < ApplicationController
  def create
    @contact = Contact.new(contact_params)

    if @contact.valid?
      ContactMailer.with(contact: @contact).send_contact_email.deliver_now
      redirect_to root_path, notice: "Your message has been successfully sent."
      # flash.alert = ""
    else
      redirect_to mobile_contact_path, alert: "There was an error sending your message. Please try again."
    end
  end

private
  def contact_params
    params.require(:contact).permit(:name, :email, :message)
  end
end
