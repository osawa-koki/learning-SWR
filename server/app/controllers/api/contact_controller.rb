class Api::ContactController < ApplicationController
  def index
    page = params[:page].presence || 1
    @contacts = Contact.order(created_at: :desc).page(page)
    render json: @contacts
  end
end
