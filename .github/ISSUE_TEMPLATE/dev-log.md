---
name: Dev Log
about: dev log
title: "[Dev-Log]"
labels: dev-log
assignees: ''

---

### **오늘은 어떻게 프로젝트에 기여했나요?**

- 

### **오늘의 프로젝트에서 힘든 점은 무엇인가요?**

- 항목별로 적어주세요.

`// 코드를 첨부해도 좋습니다.`

### **내일은 프로젝트에 기여하기 위해 무엇을 해야 하나요?**

- [ ]  Todo 형식으로 기록해주세요.

### 예시1

> ### **오늘은 어떻게 프로젝트에 기여했나요?**
> 
> - 특정 요청에 대한 확인/취소를 유저가 결정할 수 있는 alter modal을 개발했다. 브라우저 내장 alter 속성을 사용하지 않고 프로젝트 자체에서 재사용하기 쉬운 모달 컴포넌트로 구성할 수 있었다.
> - styled-component에서 prop에 css 적인 제약을 거는 방법을 학습하고 같은 포지션의 팀원과 그 내용을 나누었다.
> 
> ### **오늘의 프로젝트에서 힘든 점은 무엇인가요?**
> 
> - input에서 관리하는 상태값 변경 로직을 유틸리티 함수로 구분하고 싶은데, 쉽지가 않다.
> 
> `const useInputHook = (defaultValue) => {
>   const [value, setValue] = useState(defaultValue);
>   const handleInput = useCallback((e) => {
>     setValue(e.target.value)
>   }, []);
> 
>   // 여기서 변경된 value 상태만 리턴하면 되지 않을까?
> }`
> 
> ### **내일은 프로젝트에 기여하기 위해 무엇을 해야 하나요?**
> 
> - [ ]  `useInputHook` 함수를 모듈로 구분해서 hook 폴더에 반영하기
> - [ ]  `customHook`으로 구분할 수 있는 단순 상태값 변경 함수가 있을지 고민해보고 팀원들과 이야기하기

### 예시2
### **오늘은 어떻게 프로젝트에 기여했나요?**

> - Sequelize 모델 설정에서 belongsToMany 메서드로 User 테이블 하나만 이용한 following, follower 관계를 형성했다.
> - Controller 코드 작업을 시작했고, 기본적으로 데이터를 단순 반환하는 get 요청에 대한 서버 로직을 모두 구축했다.
> 
> ### **오늘의 프로젝트에서 힘든 점은 무엇인가요?**
> 
> - `belongsToMany` 메서드의 두 번째 인자로 조인테이블의 개별 속성을 처리할 수 있다는 점을 찾는데 많이 오래 걸렸다.
> 
> `users.belongsToMany(users, {
>   through: 'follow',
>   as: 'Followers',
>   foreignKey: 'userId'
> });`
> 
> ### **내일은 프로젝트에 기여하기 위해 무엇을 해야 하나요?**
> 
> - [ ]  기능별 요청에 대한 서버 API 코드를 작성하기 시작한다. 특히 유저가 좋아요한 글에 달린 태그들을 기반으로 비슷한 포스트를 추천해주는 로직을 많이 고민해봐야 할 것 같다.
