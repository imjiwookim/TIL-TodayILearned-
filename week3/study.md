# 📘 Today I Learned

### 1. 오늘 배운 내용
- JavaScript로 DOM을 동적으로 조작하는 방법 (createElement, innerHTML, insertAdjacentHTML)

### 2. 핵심 정리 (내 언어로)
데이터 → UI 분리 원칙

HTML에 직접 내용을 쓰는 게 아니라, JS 배열(members[])에 데이터를 담고 render() 함수가 이걸 읽어서 화면을 그린다. 데이터가 바뀌면 render()만 다시 호출하면 UI도 자동으로 바뀐다.

폼 토글 패턴

classList.toggle('open') 하나로 열림/닫힘을 처리한다. CSS에서 .form-section은 display: none, .form-section.open은 display: block으로 나눠두면 JS는 클래스만 건드리면 된다.

### 3. 결과 이미지(스크린샷)
<img width="1887" height="922" alt="스크린샷 2026-04-26 115704" src="https://github.com/user-attachments/assets/64e091f5-6b42-4ecc-84c7-622ad4838dd7" />
<img width="1861" height="935" alt="스크린샷 2026-04-26 115718" src="https://github.com/user-attachments/assets/eee59c06-d384-40d4-971f-fcbfb661e33b" />
<img width="1050" height="955" alt="스크린샷 2026-04-26 115739" src="https://github.com/user-attachments/assets/0c20ff69-35a9-41d3-a2ad-ce91aa79a4ba" />
<img width="659" height="280" alt="스크린샷 2026-04-26 115910" src="https://github.com/user-attachments/assets/fc7dc56a-c3c5-44d8-9a2d-14e6a63bdc9a" />
<img width="592" height="240" alt="스크린샷 2026-04-26 115952" src="https://github.com/user-attachments/assets/0f3e7e7d-79a9-4fdf-a5d4-1c44b44a01c9" />
<img width="1888" height="911" alt="스크린샷 2026-04-26 120224" src="https://github.com/user-attachments/assets/1e2e8758-4dfc-4b32-a5a7-61bacb54b872" />
<img width="1884" height="907" alt="스크린샷 2026-04-26 120423" src="https://github.com/user-attachments/assets/17529c33-20ee-41f0-9fba-5d22b5091139" />
<img width="1875" height="805" alt="스크린샷 2026-04-26 120515" src="https://github.com/user-attachments/assets/3af98658-8ba5-4d3d-9d81-1de8786bc5e9" />
<img width="1865" height="845" alt="스크린샷 2026-04-26 120616" src="https://github.com/user-attachments/assets/dc67799e-258d-4955-a6f0-a8f227bc72a2" />
<img width="1900" height="925" alt="스크린샷 2026-04-26 115651" src="https://github.com/user-attachments/assets/1a765dd8-1b08-49e5-a2ff-5df29aeb9366" />
<img width="1628" height="688" alt="스크린샷 2026-04-26 115626" src="https://github.com/user-attachments/assets/879b292a-b47b-4b94-b422-af824f646476" />


### 4. 느낀 점
-HTML에 내용을 직접 쓰다가 JS로 데이터를 관리하는 방식으로 바꾸니까 추가·삭제 기능이 훨씬 깔끔하게 구현됐다.
-render() 함수를 하나로 합쳐서 카드/상세/인원수를 한 번에 갱신하는 게 생각보다 편했다. 상태가 바뀔 때마다 render()만 부르면 되니까.
