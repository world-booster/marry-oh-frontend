import ErrorPageLayout from "@/pages/Error/ErrorPageLayout";

export function ForbiddenPage() {
    return (
        <ErrorPageLayout
            code={403}
            title="접근 권한이 없습니다"
            description="이 페이지에 접근할 권한이 없습니다."
        />
    );
}

export function NotFoundPage() {
    return (
        <ErrorPageLayout
            code={404}
            title="페이지를 찾을 수 없습니다"
            description="요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다."
        />
    );
}

export function ServerErrorPage() {
    return (
        <ErrorPageLayout
            code={500}
            title="서버 오류가 발생했습니다"
            description="잠시 후 다시 시도해주세요."
        />
    );
}