// 修改计数器数据
export const updateCount = ({ commit }, n) => commit('C_OUNT', n);

// 获取测试数据
export const getTestData = ({ commit }) => commit('GET_TEST');
