require "rubygems"
require "sinatra"
require "haml"
require "mongo_mapper"
require "json"
require "classes/user.rb"

set :haml, {:attr_wrapper => '"'}

MongoMapper.database = 'testdb'

get '/' do
  @scripts = Array.new
  @scripts << '/js/extra/jquery.gritter.min.js'
  @scripts << '/js/extra/jquery.ba-dotimeout.min.js'
  @scripts << '/js/extra/jquery.form.js'
  @scripts << '/js/extra/jquery.blockUI.js'
  @scripts << '/js/bendai.js'
  haml :index
end

post '/game/user/auth' do
  content_type :json
  if (params['email'] == 'colin@colinbate.com' || params['email' == 'bate.peter@gmail.com']) then
    r = {'success' => true, 'email' => params['email']}
    r['session_id'] = User.gen_salt
    r['session_start'] = Time.now.to_s
    r['form_message'] = 'User logged in!';
    return r.to_json
  end
  {'success' => false, 'form_message' => 'Validation failed.'}.to_json
end

get '/game/ui/login' do haml :login, :layout => false end
  
get '/game/ui/choose-game' do haml :choosegame, :layout => false end

post '/game/world/load' do
  content_type :json
  
  {'success' => false, 'form_message' => 'Could not locate game.'}.to_json
end

get '/game/ui/create-character' do haml :createchar, :layout => false end
    