class SloganIdeasController < ApplicationController
  before_action :set_slogan_idea, only: [:show, :edit, :update, :destroy]

  # GET /contest
  # GET /contest.json
  def contest
    @slogan_idea = SloganIdea.new
  end

  # POST validate.json
  def validate
    respond_to do |format|
      # causes controller to return 304 not-modified if no valid params found
      fields = params.permit(:first_name, :last_name, :email, :idea)
      errors = ModelFieldValidator.validate('SloganIdea', fields)
      if errors
        format.json { render json: errors, status: :ok }
      else
        format.json { render json: nil, status: :unprocessable_entity }
      end
    end
  end

  # GET /contest-static
  # GET /contest-static.json
  def contest_static
    @slogan_idea = SloganIdea.new
  end

  # GET /slogan_ideas
  # GET /slogan_ideas.json
  def index
    @slogan_ideas = SloganIdea.all
  end

  # GET /slogan_ideas/1
  # GET /slogan_ideas/1.json
  def show
  end

  # GET /slogan_ideas/new
  def new
    @slogan_idea = SloganIdea.new
  end

  # GET /slogan_ideas/1/edit
  def edit
  end

  # POST /slogan_ideas
  # POST /slogan_ideas.json
  def create
    @slogan_idea = SloganIdea.new(slogan_idea_params)

    respond_to do |format|
      if @slogan_idea.save
        format.html { redirect_to @slogan_idea, notice: 'Slogan idea was successfully created.' }
        format.json { render :show, status: :created, location: @slogan_idea }
      else
        format.html { render :new }
        format.json { render json: @slogan_idea.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /slogan_ideas/1
  # PATCH/PUT /slogan_ideas/1.json
  def update
    respond_to do |format|
      if @slogan_idea.update(slogan_idea_params)
        format.html { redirect_to @slogan_idea, notice: 'Slogan idea was successfully updated.' }
        format.json { render :show, status: :ok, location: @slogan_idea }
      else
        format.html { render :edit }
        format.json { render json: @slogan_idea.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /slogan_ideas/1
  # DELETE /slogan_ideas/1.json
  def destroy
    @slogan_idea.destroy
    respond_to do |format|
      format.html { redirect_to slogan_ideas_url, notice: 'Slogan idea was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_slogan_idea
      @slogan_idea = SloganIdea.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def slogan_idea_params
      params.require(:slogan_idea).permit(:first_name, :last_name, :email, :idea)
    end
end
