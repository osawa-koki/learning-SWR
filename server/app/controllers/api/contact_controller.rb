class Api::ContactController < ApplicationController

  limit = 30

  def index
    page = params[:page].presence || 1
    @contacts = Contact.order(created_at: :desc).page(page)
    render json: @contacts
  end
end
