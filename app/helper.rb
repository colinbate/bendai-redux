
helpers do
  Session_name = "bendai-user-session"
  def user_session
    sid = request.cookies[Session_name]
    sid ||= false
    return sid
  end
  
  def set_user_session(sid)
    response.set_cookie(Session_name, {:value => sid, :path => '/game/'})
  end
  
  def partial(page, options={})
    haml page, options.merge!(:layout => false)
  end
  
  def form_fail(msg)
    {'success' => false, 'form_message' => msg}
  end
end