require "rubygems"
require "sinatra"
require "haml"
require "mongo_mapper"
require "json"
require "classes/user.rb"

set :haml, {:attr_wrapper => '"'}

MongoMapper.database = 'testdb'

# Define some route wrappers

def json_post(route, options={}, &block)
  post(route, options) do
    content_type :json
    instance_eval(&block).to_json
  end
end

# Routes
# -------------------------------

# Main game entry point.
get '/' do
  @scripts = Array.new
  @scripts << '/js/extra/jquery.gritter.min.js'
  @scripts << '/js/extra/jquery.ba-dotimeout.min.js'
  @scripts << '/js/extra/jquery.form.js'
  @scripts << '/js/extra/jquery.blockUI.js'
  @scripts << '/js/bendai.js'
  @scripts << '/js/user.js'
	@scripts << '/js/world.js'
	@scripts << '/js/player.js'
	@scripts << '/js/party.js'
	@scripts << '/js/chat.js'
	@scripts << '/js/modal.js'
  haml :index
end

# Send login form
get '/game/ui/login' do partial :login end

# Authenticate the user
json_post '/game/user/auth' do
  if (params['email'] == 'colin@colinbate.com' || params['email' == 'bate.peter@gmail.com']) then
    r = {'success' => true, 'email' => params['email']}
    r['session_id'] = User.gen_salt
    r['session_start'] = Time.now.to_s
    r['form_message'] = 'User logged in!';
    set_user_session(r['session_id'])
    r
  else
    form_fail 'Validation failed.'
  end
end

# Send the game chooser form
get '/game/ui/choose-game' do partial :choosegame end

# Load a game
json_post '/game/world/load' do
  if (user_session == false) then
    {'success' => false, 'form_message' => 'User not logged in.'}
  else
    form_fail 'Could not locate game.'
  end
end

# Send the new character form
get '/game/ui/create-character' do partial :createchar end

# Create a new character and join it to a (new) game
json_post '/game/player/create' do
  form_fail 'Could not create or save character'
end

load "helper.rb"
    