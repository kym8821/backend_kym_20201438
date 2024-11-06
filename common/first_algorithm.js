function friendRecommendations(network, user) {
  // 방문 노드 표시. 친구이지만 이미 추천친구 목록에 추가했거나 직접 친구인 사용자들이 들어감
  visit = {};
  // stack : 깊이 우선 탐색을 할 때 사용할 자료구조
  stack = [];
  // ans : 추천 친구만을 담을 자료구조
  ans = [];
  // 자기 자신(user)과 추천친구를 visit에 추가
  visit[user] = true;
  for (let i = 0; i < network[user].length; i++) {
    friend = network[user][i];
    visit[friend] = true;
    stack.push(friend);
  }
  // dfs를 실시하며 탐색 시작
  while (stack.length > 0) {
    currentUser = stack.pop();
    for (let i = 0; i < network[currentUser].length; i++) {
      nextUser = network[currentUser][i];
      // nextUser가 visit 객체에 있다면(즉 이미 추천한 친구이거나 직접 친구라면) continue
      if (visit[nextUser]) continue;
      // 직접 친구도 아니고 이미 추천한 친구도 아니라면 : ans 배열에 넣어 추천 친구 목록에 넣고, stack에 push하여 해당 user를 기준으로 탐색을 실시 (이때 visit에 넣어서 방문처리)
      ans.push(nextUser);
      stack.push(nextUser);
      visit[nextUser] = true;
    }
  }
  return ans;
}
