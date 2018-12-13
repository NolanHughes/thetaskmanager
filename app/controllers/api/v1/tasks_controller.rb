class Api::V1::TasksController < ApplicationController
  before_action :authenticate_user!

  def index
    @your_tasks = current_user.tasks.where("assigned_to_id = '#{current_user.id}'").order('due_by ASC')
    @assigned_tasks = current_user.tasks.where("assigned_to_id != '#{current_user.id}'").order('due_by ASC')

    @users = User.all # Change to current team

    render json: {your_tasks: @your_tasks, assigned_tasks: @assigned_tasks, users: @users}
  end

  def create
    @task = current_user.tasks.new(task_params)

    if @task.save
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def show
    @task = current_user.tasks.find(params[:id])
    render json: @task
  end

  def edit
    render :index
  end

  def update
    @task = current_user.tasks.find(params[:id])
    
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @task = current_user.tasks.find(params[:id])

    if @task.destroy
      head :no_content, status: :ok
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  private
    def task_params
      params.require(:task).permit(:title, :due_by, :assigned_to_id)
    end
end

