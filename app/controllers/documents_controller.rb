class DocumentsController < ApplicationController
  def download_cv
    send_file Rails.root.join('public', 'CV_Pierre_Libran.pdf'), type: 'application/pdf', disposition: 'inline', filename: 'CV_Pierre_Libran.pdf'
  end
end
