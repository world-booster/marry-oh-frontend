export default function PostWritePage() {
    return (
        <div>
            <input placeholder="제목" />

            <select>
                <option>태그 선택</option>
                <option>웨딩</option>
            </select>

            <textarea placeholder="내용 입력" />

            <input type="file" />

            <div>
                <button>임시저장</button>
                <button>작성</button>
                <button>취소</button>
            </div>
        </div>
    );
}