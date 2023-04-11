class Api::ContactController < ApplicationController
  def index
    page = params[:page].presence || 1
    @contacts = Contact.order(id: :asc).page(page)
    render json: @contacts
  end

  def show
    @contact = Contact.find(params[:id])
    render json: @contact
  end

  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      render json: @contact
    else
      render json: @contact.errors
    end
  end

  def contact_params
    params.require(:contact).permit(:title, :content, :status, :published_at, :closed_at)
  end
end
