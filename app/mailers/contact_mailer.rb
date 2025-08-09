class ContactMailer < ApplicationMailer
  def send_contact_email
    @contact = params[:contact]
    mail(to: 'pedro89@hotmail.fr', subject: "Message from #{@contact.name} (#{@contact.email})")
  end
end
