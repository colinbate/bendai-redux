require "rubygems"
require "sinatra"
require "haml"

set :haml, {:attr_wrapper => '"'}

scripts = Array.new

get '/' do
  scripts << '/js/extra/jquery.gritter.min.js'
  scripts << '/js/bendai.js'
  haml :index
end

    