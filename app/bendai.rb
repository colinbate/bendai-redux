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
  @scripts << '/js/bendai.js'
  haml :index
end

get '/game/user/save' do
  content_type :json
  if (params['pwd'] == params['repwd']) then
    
  end
  {'success' => false}.to_json
end

    