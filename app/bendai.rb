require "rubygems"
require "sinatra"
require "haml"

set :haml, {:attr_wrapper => '"'}

get '/' do
  haml :index
end

    