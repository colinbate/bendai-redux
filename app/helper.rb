
helpers do
  Session_name = "bendai-user-session"
  def user_session
    sid = request.cookies[Session_name]
    sid ||= false
    return sid
  end
  
  def set_user_session(sid)
    response.set_cookie(Session_name, {:value => sid, :path => '/'})
  end
  
  def protect!
    unless authorized?
      if (response.content_type == 'application/json') then
        throw(:halt, [200, form_fail('You are not logged in or authorized.', false).to_json])
      else
        throw(:halt, [200, haml(:no_access)])
      end
      
    end
  end
  
  def authorized?
    # TODO: Make sure that authentication/authorization happens from the database.
    user_session() && user_session().length == 64
  end
  
  # Partials are protected by default
  def partial(page, options={}, pub=false)
    protect! unless pub
    haml page, options.merge!(:layout => false)
  end
  
  def form_ok(msg, vals={})
    {'success' => true, 'form' => {'message' => msg, 'close' => true}, 'auth' => true}.merge(vals)
  end
  
  def form_fail(msg, auth=true, close=false)
    {'success' => false, 'form' => {'message' => msg, 'close' => close}, 'auth' => auth}
  end
end