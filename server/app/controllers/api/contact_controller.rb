class Api::ContactController < ApplicationController
  def index
    @contacts = Contact.all
    render json: @contacts
  end
end
