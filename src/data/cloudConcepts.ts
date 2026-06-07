export interface QuizItem {
  type: "OX" | "MULTIPLE_CHOICE";
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface CloudConcept {
  id: string;
  category: "Cloud Basic" | "Network" | "Compute" | "Storage" | "Database" | "Security" | "DevOps" | "Container" | "Kubernetes" | "IaC / Terraform" | "Monitoring" | "Architecture";
  title: string;
  summary: string;
  analogy: string;
  practicalUse: string;
  confusionPoint: string;
  quiz: QuizItem[];
}

export const cloudConcepts: CloudConcept[] = [
  // ==========================================
  // 1. Cloud Basic (1~4)
  // ==========================================
  {
    id: "cloud-computing",
    category: "Cloud Basic",
    title: "클라우드 컴퓨팅",
    summary: "인터넷을 통해 IT 리소스를 온디맨드로 제공받고 사용한 만큼 비용을 지불하는 서비스",
    analogy: "직접 발전소를 짓지 않고 콘센트에 플러그를 꽂아 전기를 쓰고 비용을 내는 것",
    practicalUse: "물리 서버 구축 없이 인터넷으로 필요한 컴퓨팅 자원을 즉시 생성할 때",
    confusionPoint: "자원을 소유하는 것이 아니라 대여하는 개념이므로 자원 관리 방식이 다름",
    quiz: [
      {
        type: "OX",
        question: "클라우드 컴퓨팅은 초기 대규모 자본 투자가 필수적이며 고정 비용 기반으로 운영된다.",
        answer: "X",
        explanation: "초기 자본 비용을 줄이고 실제 사용한 만큼만 지불하는 가변 비용 방식임"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "클라우드 컴퓨팅의 5대 주요 특징에 포함되지 않는 것은?",
        options: ["온디맨드 셀프 서비스", "광범위한 네트워크 접속", "독점적 물리 자원 할당", "신속한 탄력성"],
        answer: "독점적 물리 자원 할당",
        explanation: "클라우드는 여러 고객이 물리 자원을 공유하는 리소스 풀링 방식을 사용함"
      }
    ]
  },
  {
    id: "region-and-az",
    category: "Cloud Basic",
    title: "리전 및 가용 영역 (Region & AZ)",
    summary: "AWS가 글로벌 서비스를 제공하는 지리적 위치(리전)와 그 내부에 격리된 데이터 센터 군집(AZ)",
    analogy: "리전은 국가별 거점 도시, 가용 영역(AZ)은 정전을 대비해 서로 떨어져 있는 개별 공장들",
    practicalUse: "국내 사용자에게 빠른 응답을 주려고 서울 리전을 쓰고, 장애 대응을 위해 2개 이상의 AZ에 서버 분산",
    confusionPoint: "리전은 지리적 영역이며, 하나의 리전 내에 독립된 가용 영역(AZ)들이 존재함",
    quiz: [
      {
        type: "OX",
        question: "가용 영역(AZ)은 지리적으로 격리된 단일 리전 내에 물리적으로 독립된 데이터 센터들의 집합이다.",
        answer: "O",
        explanation: "AZ는 리전 내에서 전력, 냉각, 네트워크가 독립된 물리적 데이터 센터들의 묶음임"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "AWS 글로벌 인프라 구조에 대한 설명으로 올바른 것은?",
        options: ["하나의 AZ 내부에는 반드시 2개 이상의 리전이 포함된다.", "하나의 리전은 물리적으로 격리된 2개 이상의 가용 영역(AZ)으로 구성된다.", "AZ와 리전은 동일한 크기의 단일 데이터 센터를 뜻한다.", "모든 리전은 전 세계의 모든 AZ를 물리적으로 공유한다."],
        answer: "하나의 리전은 물리적으로 격리된 2개 이상의 가용 영역(AZ)으로 구성된다.",
        explanation: "리전은 지리적 구역이며 그 내부에 독립된 인프라를 갖춘 AZ들이 배치됨"
      }
    ]
  },
  {
    id: "shared-responsibility-model",
    category: "Cloud Basic",
    title: "공동 책임 모델",
    summary: "클라우드 인프라와 운영 시스템의 보안에 대해 AWS와 고객이 책임을 분담하는 기준",
    analogy: "아파트 관리소는 건물 외벽과 엘리베이터를 관리하고, 집 안의 인테리어와 보안은 세입자가 책임지는 것",
    practicalUse: "인프라의 물리 보안은 AWS에 맡기고, 가상 서버의 OS 패치 및 데이터 관리는 엔지니어가 설정",
    confusionPoint: "클라우드를 이용하더라도 고객 데이터 보호와 가상 자원의 방화벽 설정은 고객의 책임임",
    quiz: [
      {
        type: "OX",
        question: "공동 책임 모델에서 고객이 생성한 EC2 게스트 운영체제(OS)의 보안 패치는 AWS의 책임이다.",
        answer: "X",
        explanation: "EC2 가상 서버 내부의 OS 패치 및 구성 관리는 고객의 책임 영역임"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "공동 책임 모델에서 AWS의 책임 영역(클라우드 자체의 보안)에 해당하는 것은?",
        options: ["고객 데이터 암호화 설정", "IAM 사용자 권한 할당", "데이터 센터의 물리적 보안", "네트워크 ACL 규칙 정의"],
        answer: "데이터 센터의 물리적 보안",
        explanation: "물리 하드웨어, 글로벌 인프라 및 가상화 소프트웨어 레이어의 보안은 AWS가 책임짐"
      }
    ]
  },
  {
    id: "cloud-service-models",
    category: "Cloud Basic",
    title: "IaaS / PaaS / SaaS",
    summary: "클라우드 제공업체가 관리하고 지원하는 범위에 따른 서비스 모델 분류",
    analogy: "IaaS는 주방 시설 대여, PaaS는 가스레인지와 밀키트까지 제공, SaaS는 완제품 음식 배달",
    practicalUse: "OS 레벨 통제가 필요할 때는 IaaS(EC2)를, 인프라 관리 없이 코드만 배포할 때는 PaaS(Elastic Beanstalk) 선택",
    confusionPoint: "PaaS나 SaaS로 갈수록 인프라 관리 부담은 줄어들지만 시스템 제어권은 제한됨",
    quiz: [
      {
        type: "OX",
        question: "가상 서버, 네트워크, 스토리지만 제공받아 사용자가 직접 OS와 런타임을 구성하는 모델은 IaaS이다.",
        answer: "O",
        explanation: "IaaS(Infrastructure as a Service)는 기본 하드웨어 인프라 자원을 가상화하여 제공함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "개발자가 밑단의 OS나 미들웨어 관리 없이 애플리케이션 실행 파일이나 코드만 배포하는 모델은?",
        options: ["IaaS", "PaaS", "SaaS", "On-Premise"],
        answer: "PaaS",
        explanation: "PaaS(Platform as a Service)는 하위 플랫폼 인프라를 추상화하여 개발 환경을 제공함"
      }
    ]
  },

  // ==========================================
  // 2. Network (5~10)
  // ==========================================
  {
    id: "vpc",
    category: "Network",
    title: "VPC (Virtual Private Cloud)",
    summary: "AWS 계정 내에서 논리적으로 격리된 사용자 전용 가상 네트워크 공간",
    analogy: "회사 건물 내부 공간을 확보하여 부서별 전용 보안 구역을 설정하는 것",
    practicalUse: "EC2, RDS 등의 리소스를 배치하기 위해 프라이빗 IP 대역을 정의하고 서브넷을 설계할 때 사용",
    confusionPoint: "VPC는 리전 단위의 가상 네트워크이며, 다른 VPC와 네트워크가 기본적으로 격리됨",
    quiz: [
      {
        type: "OX",
        question: "VPC는 사용자가 IP 주소 범위 선택, 서브넷 생성, 라우팅 테이블 구성을 직접 제어할 수 있는 네트워크이다.",
        answer: "O",
        explanation: "VPC는 클라우드 내에서 사용자가 정의하는 프라이빗 가상 네트워크 환경임"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "VPC에 대한 설명으로 올바르지 않은 것은?",
        options: ["기본적으로 다른 VPC와 네트워크가 격리되어 있다.", "VPC를 생성할 때 가상 네트워크의 IP 주소 범위를 CIDR로 지정한다.", "하나의 VPC는 여러 AWS 리전에 걸쳐 생성될 수 있다.", "VPC 내부 공간을 더 작은 단위인 서브넷으로 분할할 수 있다."],
        answer: "하나의 VPC는 여러 AWS 리전에 걸쳐 생성될 수 있다.",
        explanation: "VPC는 특정 리전에 종속되며 여러 리전에 걸쳐 생성될 수 없음"
      }
    ]
  },
  {
    id: "subnet",
    category: "Network",
    title: "서브넷 (Subnet)",
    summary: "VPC의 IP 주소 범위를 목적에 따라 분할하여 만든 더 작은 가상 네트워크 구역",
    analogy: "회사 층 내부에서 외부인이 들어오는 '로비'와 직원만 들어가는 '통제 구역'으로 나누는 것",
    practicalUse: "웹서버는 인터넷 연결용 퍼블릭 서브넷에, 데이터베이스는 외부 접근을 막는 프라이빗 서브넷에 배치",
    confusionPoint: "하나의 서브넷은 하나의 가용 영역(AZ)에 속하며, 여러 AZ에 걸쳐 존재할 수 없음",
    quiz: [
      {
        type: "OX",
        question: "AWS에서 단일 서브넷은 동일 리전 내의 여러 가용 영역(AZ)에 동시 연결되어 동작할 수 있다.",
        answer: "X",
        explanation: "서브넷은 항상 단 하나의 가용 영역(AZ) 내에 상주해야 함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "인터넷 게이트웨이(IGW)로 향하는 라우팅 경로를 가져 외부 인터넷과 인바운드/아웃바운드 통신이 가능한 서브넷은?",
        options: ["Private Subnet", "Public Subnet", "Isolated Subnet", "Secure Subnet"],
        answer: "Public Subnet",
        explanation: "라우팅 테이블에 외부 인터넷(0.0.0.0/0)을 향하는 IGW 경로가 지정된 서브넷을 퍼블릭 서브넷이라고 함"
      }
    ]
  },
  {
    id: "internet-gateway",
    category: "Network",
    title: "인터넷 게이트웨이 (IGW)",
    summary: "VPC 리소스와 인터넷 간의 양방향 통신을 지원하기 위해 VPC에 연결하는 컴포넌트",
    analogy: "건물 내 가상 도로와 외부 공용 도로를 연결해주는 메인 게이트",
    practicalUse: "서브넷의 라우팅 테이블에 '0.0.0.0/0 → IGW' 경로를 추가하여 외부 인터넷과 통신을 허용할 때 사용",
    confusionPoint: "서버가 IGW에 직접 붙는 것이 아니라, 서브넷의 라우팅 테이블 설정을 통해 통로로 연결됨",
    quiz: [
      {
        type: "OX",
        question: "인터넷 게이트웨이(IGW)가 VPC에 연결되어 있어도 서브넷 라우팅 테이블에 해당 경로가 없으면 인터넷과 통신할 수 없다.",
        answer: "O",
        explanation: "VPC 연결 후 서브넷 단위의 라우팅 테이블에 0.0.0.0/0 타겟으로 IGW를 지정해야 함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "VPC 내부 리소스가 외부 인터넷과 양방향 통신을 하기 위한 필수 구성 요소들의 조합으로 옳은 것은?",
        options: ["프라이빗 IP + NAT 게이트웨이", "퍼블릭/탄력적 IP + 라우팅 테이블의 IGW 경로 설정", "보안 그룹 내부 포트 전체 차단 + 로컬 라우팅", "NACL의 모든 규칙 거부 + IGW 연결"],
        answer: "퍼블릭/탄력적 IP + 라우팅 테이블의 IGW 경로 설정",
        explanation: "퍼블릭 IP 자원과 라우팅 테이블 내 IGW 목적지 정의가 결합되어야 퍼블릭 통신이 됨"
      }
    ]
  },
  {
    id: "nat-gateway",
    category: "Network",
    title: "NAT 게이트웨이",
    summary: "프라이빗 서브넷 리소스가 인터넷으로 아웃바운드 요청을 보내되 외부의 인바운드 접근은 차단하는 네트워크 서비스",
    analogy: "내선번호로 외부 전화 통화는 가능하지만 외부에서 직접 내선으로 전화를 걸 수 없는 회사 통신망",
    practicalUse: "보안 영역에 둔 데이터베이스 서버가 외부 패키지 저장소로부터 보안 업데이트를 다운로드받아야 할 때",
    confusionPoint: "NAT 게이트웨이 자체는 아웃바운드 연결을 위해 반드시 퍼블릭 서브넷에 배치되어야 함",
    quiz: [
      {
        type: "OX",
        question: "NAT 게이트웨이는 외부 인터넷에서 프라이빗 서브넷 내부 서버로 시작하는 최초 접속 요청을 허용한다.",
        answer: "X",
        explanation: "내부에서 나가는 응답 트래픽만 통과시키며 외부에 의한 최초 연결 수립은 차단함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "NAT 게이트웨이를 설계할 때 인프라 엔지니어가 준수해야 할 올바른 배치 방식은?",
        options: ["프라이빗 서브넷에 생성하고 외부 IP를 제거한다.", "퍼블릭 서브넷에 생성하고, 프라이빗 서브넷 라우팅 테이블에 인터넷 경로로 지정한다.", "VPC 외부 인프라에 생성 후 전용선으로 연결한다.", "IGW 내부 모듈로 탑재하여 사용한다."],
        answer: "퍼블릭 서브넷에 생성하고, 프라이빗 서브넷 라우팅 테이블에 인터넷 경로로 지정한다.",
        explanation: "인터넷과 닿는 퍼블릭 서브넷에 배치한 뒤 프라이빗 서브넷의 라우팅 테이블이 이를 보게 유도함"
      }
    ]
  },
  {
    id: "security-group-vs-nacl",
    category: "Network",
    title: "보안 그룹 vs 네트워크 ACL",
    summary: "인스턴스 레벨(보안 그룹)과 서브넷 레벨(NACL)에서 트래픽을 필터링하는 방화벽 레이어",
    analogy: "보안 그룹은 '개별 객실 문 앞의 사설 경비원', 네트워크 ACL은 '건물 메인 로비의 출입 게이트'",
    practicalUse: "특정 EC2의 웹 포트(80) 접근을 허용할 땐 보안 그룹을, 서브넷 단위로 특정 대역 IP를 차단할 땐 NACL 설정",
    confusionPoint: "보안 그룹은 상태 저장형(Stateful)으로 허용된 요청의 응답 트래픽은 자동 허용되나, NACL은 양방향 규칙을 모두 적어야 함",
    quiz: [
      {
        type: "OX",
        question: "보안 그룹(Security Group)은 규칙 수립 시 명시적인 '거부(Deny)' 규칙을 등록할 수 있다.",
        answer: "X",
        explanation: "보안 그룹은 허용(Allow) 규칙만 설정 가능하며 거부 규칙은 네트워크 ACL에서 설정해야 함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "보안 그룹의 '상태 저장(Stateful)' 특성에 대한 설명으로 올바른 것은?",
        options: ["인바운드 규칙에 허용된 요청에 대한 응답 트래픽은 아웃바운드 규칙과 상관없이 자동 허용된다.", "한 번 설정한 보안 규칙의 상태는 절대 변경할 수 없다.", "트래픽이 들어올 때마다 인스턴스가 재부팅 상태가 된다.", "인바운드와 아웃바운드 규칙에 동일한 포트 번호를 중복 기술해야만 작동한다."],
        answer: "인바운드 규칙에 허용된 요청에 대한 응답 트래픽은 아웃바운드 규칙과 상관없이 자동 허용된다.",
        explanation: "Stateful 방화벽은 연결 상태를 추적하므로 나가는 트래픽 경로를 아웃바운드에 별도로 열어두지 않아도 통과됨"
      }
    ]
  },
  {
    id: "route-table",
    category: "Network",
    title: "라우팅 테이블 (Route Table)",
    summary: "서브넷 또는 게이트웨이의 트래픽이 목적지 주소로 이동할 수 있도록 안내하는 네트워크 이정표 세트",
    analogy: "교차로에 배치된 목적지별 도로 이정표 안내판",
    practicalUse: "VPC 내부 통신을 제외한 모든 인터넷 트래픽(0.0.0.0/0)을 NAT 게이트웨이 또는 인터넷 게이트웨이로 향하게 라우팅할 때",
    confusionPoint: "VPC 내부용 로컬(Local) 라우팅 경로는 기본값으로 자동 삽입되며 사용자가 삭제할 수 없음",
    quiz: [
      {
        type: "OX",
        question: "VPC 내부의 모든 서브넷은 별도로 지정하지 않아도 기본 라우팅 테이블의 Local 규칙에 의해 서로 프라이빗 통신이 가능하다.",
        answer: "O",
        explanation: "VPC 내 전체 CIDR 블록에 매핑된 로컬 라우팅이 기본 적용되어 내부 통신이 연동됨"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "라우팅 테이블 설정에서 전 세계 모든 인터넷 대역을 의미하는 기본 경로(Default Route) 표기법은?",
        options: ["10.0.0.0/16", "192.168.0.1/32", "0.0.0.0/0", "255.255.255.255/32"],
        answer: "0.0.0.0/0",
        explanation: "0.0.0.0/0은 특정 목적지가 지정되지 않은 모든 대역의 트래픽을 처리하는 규칙으로 쓰임"
      }
    ]
  },

  // ==========================================
  // 3. Compute (11~15)
  // ==========================================
  {
    id: "ec2",
    category: "Compute",
    title: "EC2 (Elastic Compute Cloud)",
    summary: "AWS 클라우드 위에서 원하는 사양으로 가상 서버를 구성해 사용하는 컴퓨팅 서비스",
    analogy: "필요한 CPU와 메모리 사양을 골라서 원격으로 제어하는 조립식 가상 PC 대여",
    practicalUse: "전통적인 웹 애플리케이션 아키텍처나 웹 서버를 구동할 OS 환경이 필요할 때 배포",
    confusionPoint: "종료(Terminate) 시 루트 EBS 볼륨은 기본 삭제되나 설정 변경을 통해 유지하거나 추가 볼륨을 보존할 수 있음",
    quiz: [
      {
        type: "OX",
        question: "EC2 인스턴스를 '중지(Stop)' 상태로 전환하면 인스턴스에 할당된 가상 CPU 및 메모리 사용 비용은 청구되지 않는다.",
        answer: "O",
        explanation: "중지 중에는 컴퓨팅 자원 비용이 부과되지 않으나 연결된 EBS 스토리지 비용은 유지됨"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "EC2 인스턴스의 삭제(종료, Terminate) 시점에 데이터 보존 현상에 대한 설명으로 올바른 것은?",
        options: ["기본 설정 상태에서 루트(OS) EBS 볼륨은 보존된다.", "DeleteOnTermination 속성 설정에 따라 루트 볼륨의 자동 삭제 여부를 결정할 수 있다.", "모든 추가 장착 EBS 볼륨은 사용자의 설정과 관계없이 동시 파기된다.", "인스턴스 내부 메모리 데이터가 영구 보관용 하드디스크에 자동 복사된다."],
        answer: "DeleteOnTermination 속성 설정에 따라 루트 볼륨의 자동 삭제 여부를 결정할 수 있다.",
        explanation: "종료 시 볼륨 삭제 속성(DeleteOnTermination)을 비활성화해 두면 인스턴스가 삭제되어도 데이터 볼륨을 살릴 수 있음"
      }
    ]
  },
  {
    id: "ami",
    category: "Compute",
    title: "AMI (Amazon Machine Image)",
    summary: "EC2 인스턴스를 시작하는 데 필요한 운영체제, 애플리케이션 서버, 초기 구성 설정을 담은 템플릿",
    analogy: "새 컴퓨터에 OS와 필요 프로그램을 세팅한 후 구워놓은 시스템 복구 이미지 파일",
    practicalUse: "동일한 골든 이미지를 기반으로 웹 서버 다수를 표준화된 환경으로 신속하게 다량 복제 배포할 때",
    confusionPoint: "AMI는 정적인 가상머신 스냅샷 이미지이므로 실행 엔진인 인스턴스 자원과는 구별됨",
    quiz: [
      {
        type: "OX",
        question: "운영 중인 EC2 인스턴스의 현재 세팅을 템플릿화하여 사용자 지정 커스텀 AMI를 생성할 수 있다.",
        answer: "O",
        explanation: "현재 인스턴스 상태와 루트 볼륨을 스냅샷으로 만들어 나만의 고유 AMI로 보관 가능함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "AMI가 내포하고 있는 구성 요소 범위에 해당하지 않는 것은?",
        options: ["루트 볼륨 템플릿(OS, 패키지)", "블록 디바이스 매핑 정보", "인스턴스 시작 권한 제어 정보", "실시간 호스트 CPU 사용률 지표"],
        answer: "실시간 호스트 CPU 사용률 지표",
        explanation: "실시간 시스템 지표 정보는 CloudWatch 모니터링 영역이며 정적 템플릿인 AMI 정보가 아님"
      }
    ]
  },
  {
    id: "elb",
    category: "Compute",
    title: "ELB / ALB (Load Balancer)",
    summary: "유입되는 트래픽을 다수의 대상(EC2, 컨테이너, IP 등)으로 자동 분산하는 관리형 부하분산 장치",
    analogy: "은행 로비에서 대기하는 고객들을 비어있는 상담 창구로 순차적으로 유도하는 안내 담당자",
    practicalUse: "웹 트래픽이 폭증할 때 여러 대의 백엔드 서버로 사용자의 HTTP/HTTPS 요청을 골고루 배분할 때 사용",
    confusionPoint: "ALB(Application Load Balancer)는 주로 OSI 7계층에서 동작하며 URL 주소나 HTTP 헤더 기반 라우팅을 지원함",
    quiz: [
      {
        type: "OX",
        question: "AWS 로드 밸런서는 분산 대상 서버들의 헬스 체크(Health Check)를 수행하여 비정상 서버를 전송 대상에서 자동 제외한다.",
        answer: "O",
        explanation: "지속적인 상태 검사를 통해 정상 신호를 보내는 인스턴스로만 트래픽을 라우팅함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "HTTP 요청의 주소 경로(예: `/api/v1` 또는 `/static`) 조건에 맞춰 트래픽을 서로 다른 대상 그룹으로 라우팅하는 데 적합한 로드 밸런서는?",
        options: ["Classic Load Balancer", "Network Load Balancer", "Application Load Balancer", "Gateway Load Balancer"],
        answer: "Application Load Balancer",
        explanation: "Application Load Balancer(ALB)는 7계층 가시성을 가져 HTTP 콘텐츠 및 경로 단위 분산 처리가 가능함"
      }
    ]
  },
  {
    id: "auto-scaling",
    category: "Compute",
    title: "오토 스케일링 (Auto Scaling)",
    summary: "정의한 조건과 정책에 따라 EC2 인스턴스 수량을 자동으로 동적 확장하거나 축소하는 서비스",
    analogy: "마트의 대기 줄 길이에 맞춰 계산대 운영 개수를 탄력적으로 늘리거나 줄이는 가변형 운영 구조",
    practicalUse: "이벤트로 인해 웹 트래픽이 상승하면 인스턴스를 늘리고, 새벽 시간대에 수요가 감소하면 인스턴스를 차감해 비용 절감",
    confusionPoint: "인스턴스 타입이나 AMI 정보는 시작 템플릿(Launch Template)에 설정하며, 수량 범위는 Auto Scaling 그룹(ASG)에서 제어함",
    quiz: [
      {
        type: "OX",
        question: "Auto Scaling 기능을 활용하면 부하 강도에 따른 서버 확장(Scale-out) 뿐 아니라 유휴 상태 시 축소(Scale-in) 프로세스도 자동화할 수 있다.",
        answer: "O",
        explanation: "비용 최적화를 위해 트래픽 하락 시 사전에 정의한 최소 인스턴스 한도까지 서버 개수를 자동 감축함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "Auto Scaling 아키텍처 구성에서 인스턴스의 상세 스펙(AMI ID, 인스턴스 유형, 키 페어, 보안 그룹 등)을 저장하는 컴포넌트는?",
        options: ["Auto Scaling Group", "Launch Template (시작 템플릿)", "Target Group", "Scaling Policy"],
        answer: "Launch Template (시작 템플릿)",
        explanation: "새로 투입될 가상 서버의 명세와 청사진 정보는 시작 템플릿(Launch Template)에 기술하여 분리 관리함"
      }
    ]
  },
  {
    id: "lambda",
    category: "Compute",
    title: "람다 (Lambda)",
    summary: "서버 프로비저닝이나 관리 없이 개발자가 작성한 코드만 이벤트에 반응하여 실행하는 서버리스 컴퓨팅 서비스",
    analogy: "필요할 때 탑승한 시간만큼 비용을 지불하고 이용하는 공유 킥보드 서비스",
    practicalUse: "사용자가 이미지 버킷에 원본 사진을 올렸을 때, 자원 소모성 썸네일 변환 로직을 일시적으로 자동 수행할 때 사용",
    confusionPoint: "24시간 지속 구동되는 웹서버 용도가 아니며, 단일 함수 호출당 최대 실행 시간은 15분으로 제한됨",
    quiz: [
      {
        type: "OX",
        question: "AWS Lambda 서비스는 작성된 코드가 호출되지 않고 대기 상태를 유지하는 유휴 시간 동안에도 서버 유지 비용이 지속 청구된다.",
        answer: "X",
        explanation: "서버리스 특성상 코드가 직접 수행된 횟수와 실행 시간(밀리초) 기준으로만 비용을 집계함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "AWS Lambda 함수의 단일 요청당 최대 연속 처리 가능 시간(Timeout) 제약 조건은?",
        options: ["5분", "10분", "15분", "30분"],
        answer: "15분",
        explanation: "현재 AWS Lambda 인프라 구성상 최대 실행 제한 정책 시간은 15분(900초)임"
      }
    ]
  },

  // ==========================================
  // 4. Storage (16~20)
  // ==========================================
  {
    id: "ebs",
    category: "Storage",
    title: "EBS (Elastic Block Store)",
    summary: "EC2 인스턴스에 연결하여 사용할 수 있는 블록 수준 고성능 가상 스토리지 볼륨",
    analogy: "데스크탑 본체 내부에 직접 케이블로 체결하여 사용하는 범용 SSD 또는 내장 HDD",
    practicalUse: "EC2 가상 서버에 리눅스 운영체제를 마운트하고 로컬 애플리케이션 파일과 로그를 상시 보관할 때 필수 사용",
    confusionPoint: "볼륨은 원칙적으로 동일한 가용 영역(AZ) 내에 배치된 EC2 인스턴스에만 연결할 수 있음",
    quiz: [
      {
        type: "OX",
        question: "EBS 볼륨은 데이터를 유실하지 않고 운영 중에 실시간으로 스토리지 용량 크기나 성능(IOPS)을 확장 조정할 수 있다.",
        answer: "O",
        explanation: "볼륨 수정 기능을 통해 서버 다운타임 없이 디스크 볼륨 용량을 동적 상향 조정하는 것을 지원함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "EBS 스토리지 자원의 구조적 특성으로 올바른 표현은?",
        options: ["웹 브라우저의 고유 URL 주소 체계로 외부에서 직접 개별 파일에 접근한다.", "생성 시 지정된 특정 가용 영역(AZ) 내 인스턴스들과 통신 결합이 가능하다.", "용량이 늘어나는 만큼 인프라 내부에서 무제한 자동 분산 확장 처리가 이루어진다.", "여러 서로 다른 리전 간에 단일 디스크 볼륨을 실시간 물리 공유한다."],
        answer: "생성 시 지정된 특정 가용 영역(AZ) 내 인스턴스들과 통신 결합이 가능하다.",
        explanation: "EBS 볼륨은 특정 가용 영역 내의 인프라 아키텍처에 매핑되므로 같은 AZ 안의 EC2 서버와 연결됨"
      }
    ]
  },
  {
    id: "s3",
    category: "Storage",
    title: "S3 (Simple Storage Service)",
    summary: "객체 아키텍처 주소 체계를 기반으로 인터넷 어디서나 대용량 데이터를 저장하고 조회할 수 있는 웹 스토리지",
    analogy: "용량 제약 없이 상시 링크 추출 관리가 가능한 네트워크 전용 범용 드라이브 공간",
    practicalUse: "정적 웹 사이트 리소스(HTML, JS, 이미지), 미디어 자원 배포물, 시스템 데이터 장기 백업 본 보관",
    confusionPoint: "파일 식별용 키 중심의 객체형 스토리지이므로 파일 시스템 기반의 OS 설치 공간으로는 활용할 수 없음",
    quiz: [
      {
        type: "OX",
        question: "S3에 업로드된 개별 객체 파일들은 고유한 HTTP 엔드포인트 URL 주소 명세를 가질 수 있다.",
        answer: "O",
        explanation: "보안 정책 설정 권한 처리를 통과한 객체들은 개별 웹 URL 주소로 외부 브라우저와 통신 연동이 됨"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "AWS S3 스토리지 구조에서 자원을 담는 최상위 컨테이너 공간이자 글로벌 고유 명칭 규격을 지녀야 하는 단위는?",
        options: ["Folder", "Directory", "Bucket", "Vault"],
        answer: "Bucket",
        explanation: "S3의 최상위 루트 단위는 버킷(Bucket)이며 전 세계 AWS 전체 테넌트 유저 사이에서 이름이 중복될 수 없음"
      }
    ]
  },
  {
    id: "s3-storage-classes",
    category: "Storage",
    title: "S3 스토리지 클래스 (Standard / Glacier)",
    summary: "데이터의 접근 빈도 및 아카이브 보관 필요성에 맞춰 비용 구조를 차등 적용하는 저장 등급 관리 체계",
    analogy: "자주 꺼내는 생활 용품은 '거실 서랍(Standard)', 1년에 한 번 볼 과거 계약 서류는 '지하 창고(Glacier)'에 두는 배정",
    practicalUse: "현재 유저가 실시간 소비하는 미디어는 Standard에 배치하고, 컴플라이언스 준수 목적의 5년 전 회계 감사 로그는 Glacier로 전송",
    confusionPoint: "Glacier 등급은 단위 용량당 저장 비용이 낮으나, 보관 데이터를 재조회(복원)하는 데 일정 지연 대기 시간이 발생함",
    quiz: [
      {
        type: "OX",
        question: "S3 Glacier 클래스에 장기 백업 처리된 아카이브 객체는 별도 지연 시간 없이 밀리초 단위로 상시 즉시 다운로드 가능하다.",
        answer: "X",
        explanation: "Glacier 데이터는 가용화 상태로 전환(Retrieval)하는 데 최소 수 분에서 수 시간의 데이터 복원 대기 절차가 수반됨"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "자주 조회되지는 않지만 필요 시 즉각(밀리초 단위) 접근해야 하는 로그 보관용으로 가성비가 높은 S3 스토리지 등급은?",
        options: ["S3 Standard", "S3 Standard-IA (Infrequent Access)", "S3 Glacier Flexible Retrieval", "S3 Glacier Deep Archive"],
        answer: "S3 Standard-IA (Infrequent Access)",
        explanation: "Standard-IA(간헐적 액세스) 등급은 밀리초 단위 즉시 접근 가용성을 주면서 보관 단가를 낮춘 실무형 클래스임"
      }
    ]
  },
  {
    id: "efs",
    category: "Storage",
    title: "EFS (Elastic File System)",
    summary: "여러 AWS EC2 가상 인스턴스가 네트워크를 통해 동시 탑재하여 파일을 다중 공유할 수 있는 공유 파일 시스템",
    analogy: "사무실 내부 공유 네트워크 망에 물려 수십 명의 사원이 동시 파일 공유를 수행하는 공용 파일 서버(NAS)",
    practicalUse: "Auto Scaling으로 대수가 늘어난 여러 백엔드 서버 인스턴스들이 중앙의 공용 미디어 업로드 경로를 공유해야 할 때",
    confusionPoint: "EBS는 통상 1대1 인스턴스 매핑 구조를 가지나, EFS는 네트워크 프로토콜(NFSv4)을 통해 다대일 연결을 지원함",
    quiz: [
      {
        type: "OX",
        question: "EFS는 파일이 추가되거나 삭제되는 상황에 따라 스토리지 용량을 수동 개입 없이 자동으로 확장하고 축소한다.",
        answer: "O",
        explanation: "사용량 가변형 파일 시스템이므로 별도의 디스크 볼륨 공간 크기를 사전에 예약할 필요가 없음"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "여러 가용 영역(AZ)에 흩어진 수십 대의 리눅스 EC2 인스턴스가 중앙에서 표준 NFS 통신으로 공유 디스크를 사용하고자 할 때 알맞은 기술은?",
        options: ["EBS Volume", "Instance Store", "S3 Glacier", "EFS"],
        answer: "EFS",
        explanation: "리전 내 여러 가용 영역(AZ)의 EC2 인스턴스가 NFS 방식으로 함께 사용할 수 있는 공유 파일 시스템은 EFS임"
      }
    ]
  },
  {
    id: "instance-store",
    category: "Storage",
    title: "인스턴스 스토어 (Instance Store)",
    summary: "EC2 가상 호스트 컴퓨터의 물리 디스크 자원에 내장되어 고대역폭 I/O를 지원하는 임시 휘발성 스토리지",
    analogy: "전원이 꺼지거나 재부팅 포맷 처리를 수행하면 초기화되는 하이퍼 스피드 임시 가상 디스크 영역",
    practicalUse: "고속 파일 연산 작업 시 임시 가공용 버퍼 스페이스, 스왑 메모리 공간, 재현 가능한 분산 캐시 시스템에 사용",
    confusionPoint: "인스턴스를 중지(Stop) 후 시작(Start)하면 가상 서버 호스트가 변경되므로 저장된 원본 데이터는 소멸함",
    quiz: [
      {
        type: "OX",
        question: "인스턴스 스토어가 할당된 EC2 인스턴스를 콘솔에서 '중지(Stop)' 후 다시 '시작'하면 내부 데이터는 보존된다.",
        answer: "X",
        explanation: "인스턴스 중지 시 물리 하드웨어 바인딩이 해제되므로 임시 인스턴스 스토어 데이터는 소멸 처리됨"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "인스턴스 스토어 아키텍처의 주된 기술적 강점과 타겟 활용 시나리오는?",
        options: ["재해 복구를 위한 데이터 영구 보관 성능", "네트워크 대역을 거치지 않는 물리 로컬 스토리지 특유의 대용량 초고속 I/O 처리", "전 세계 S3 버킷으로의 백업 데이터 자동 포워딩 기능", "동일 서브넷 내 여러 EC2 서버들 간의 실시간 다중 마운트 지원"],
        answer: "네트워크 대역을 거치지 않는 물리 로컬 스토리지 특유의 대용량 초고속 I/O 처리",
        explanation: "가상 네트워크 결합 스토리지가 아닌 로컬 호스트 가상 하드웨어에 직결된 자원이므로 디스크 처리 속도가 빠름"
      }
    ]
  },

  // ==========================================
  // 5. Database (21~25)
  // ==========================================
  {
    id: "rds",
    category: "Database",
    title: "RDS (Relational Database Service)",
    summary: "관계형 데이터베이스의 설치, 운영 관리, 패치, 백업 프로세스를 자동화하여 관리해주는 관리형 DB 서비스",
    analogy: "전문 관리인이 항시 상주하여 관리 및 청소 설정을 도맡아 처리해주는 렌탈형 전문 주방 시설",
    practicalUse: "MySQL, PostgreSQL 등의 표준 SQL 엔진을 기반으로 정형화된 트랜잭션 처리가 요구되는 엔터프라이즈 데이터 저장",
    confusionPoint: "AWS가 하부 운영체제 인프라 레이어를 직접 관리하므로 사용자가 DB 호스트 OS에 SSH 직접 접근을 수행할 수 없음",
    quiz: [
      {
        type: "OX",
        question: "AWS RDS 서비스를 이용하면 사용자가 인프라를 수동 코딩하지 않아도 백업 활성화 옵션 클릭만으로 정기 자동 스냅샷을 생성할 수 있다.",
        answer: "O",
        explanation: "시점 복구(PITR) 목적의 데이터베이스 자동 트랜잭션 백업 스냅샷을 기본 지원함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "RDS 아키텍처에서 주 데이터베이스 서버에 인가되는 조회(Select) 쿼리 병목 부하를 완화하기 위해 연동하는 복제 엔진의 명칭은?",
        options: ["Multi-AZ Standby Instance", "Read Replica (읽기 복제본)", "Database Snapshot", "Storage Auto Scaling Engine"],
        answer: "Read Replica (읽기 복제본)",
        explanation: "비동기 복제본인 Read Replica를 다중화하면 읽기 전용 대규모 유저 조회 트래픽을 분산 처리할 수 있음"
      }
    ]
  },
  {
    id: "rds-multi-az",
    category: "Database",
    title: "RDS 다중 AZ (Multi-AZ)",
    summary: "고가용성 확보를 위해 물리적으로 분리된 다른 가용 영역(AZ)에 예비 데이터베이스 복제본을 실시간 동기화 상태로 대기시키는 기술",
    analogy: "경기 중 메인 투수가 부상을 당하면 불펜에서 실시간 연습 투구를 하던 교체 투수가 즉시 마운드에 들어서는 백업 체계",
    practicalUse: "기본 가동 중인 AZ 인프라 영역에 자연재해나 정전 등이 생겼을 때 서비스 단절 최소화를 위한 자동 페일오버 구동",
    confusionPoint: "Multi-AZ의 대기(Standby) DB 서버 인스턴스는 평상시 사용자의 액티브 읽기/쓰기 쿼리를 처리하지 않음",
    quiz: [
      {
        type: "OX",
        question: "RDS Multi-AZ 배포 아키텍처의 대기(Standby) 인스턴스는 개발 환경의 대규모 조회(SELECT) 작업용 엔드포인트로 동시 활용이 가능하다.",
        answer: "X",
        explanation: "Standby 인스턴스는 평소에 트래픽 유입 주소 접근이 차단되며 오직 장애 대비용 동기화 작업만 수행함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "기본 활성 데이터베이스 하드웨어 인프라에 문제 감지 시, 대기 DB 인스턴스를 마스터로 승격하고 주소(DNS)를 자동 전환하는 처리는?",
        options: ["Failover (장애 조치)", "Auto Scaling", "Database Migration", "Read Splitting"],
        answer: "Failover (장애 조치)",
        explanation: "시스템 문제 환경을 인지하여 예비 인프라 자원으로 통신 주권을 대체 넘기는 복구 메커니즘을 Failover라 명명함"
      }
    ]
  },
  {
    id: "dynamodb",
    category: "Database",
    title: "DynamoDB",
    summary: "대규모 트래픽 환경에서 한 자릿수 밀리초 수준의 응답 성능을 목표로 설계된 완전 관리형 NoSQL 데이터베이스",
    analogy: "복잡한 수기 장부 분석 없이 고유 바코드 키(Key)를 인식시켜 물품 내용(Value)을 고속 인출하는 무인 자동화 분류기",
    practicalUse: "글로벌 모바일 게임 유저 세션 상태 기록, 이커머스 장바구니 리스트 등 키-값 형태의 고속 대량 트래픽 가공 처리",
    confusionPoint: "테이블 간 복잡한 관계형 조인(JOIN) 연산 처리가 부적합하므로 단순 고속 인덱스 쿼리 위주 설계가 권장됨",
    quiz: [
      {
        type: "OX",
        question: "DynamoDB는 대량의 정형 데이터 구조 간 다중 JOIN 연산 기능 처리를 최우선 목표로 구현된 SQL 중심 데이터베이스이다.",
        answer: "X",
        explanation: "NoSQL 데이터베이스 구조체로서 수평 확장이 용이한 키-값(Key-Value) 및 문서 지향 데이터 모델링에 최적화됨"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "AWS DynamoDB 인프라의 주요 아키텍처적 특성이 아닌 설명은?",
        options: ["한 자릿수 밀리초 수준의 빠른 응답 속도 지향", "서버 프로비저닝 관리가 불필요한 고유 서버리스 방식 아키텍처", "내장된 관계형 데이터 JOIN 엔진의 활용", "자동 데이터 파티셔닝 기반의 수평적 리소스 스케일링"],
        answer: "내장된 관계형 데이터 JOIN 엔진의 활용",
        explanation: "NoSQL DB에서는 분산 처리를 방해하는 복잡한 RDB 스타일의 JOIN 구조는 수용하지 않음"
      }
    ]
  },
  {
    id: "elasticache",
    category: "Database",
    title: "ElastiCache",
    summary: "자주 요청되는 읽기 데이터 결과물을 메모리(RAM) 레이어에 임시 캐싱하여 메인 DB 부하를 차감하는 인메모리 데이터 저장소",
    analogy: "두꺼운 서류철을 매번 가지러 보관고에 가지 않고, 가장 빈번하게 참조하는 페이지만 책상 위 메모 패드에 올려놓고 확인하는 것",
    practicalUse: "실시간 급상승 검색 키워드 순위, 대형 쇼핑몰 공통 메인 상품 정보의 초당 수만 건 조회 성능 방어",
    confusionPoint: "RAM 데이터 상주 특성상 데이터 입출력이 빠르지만 인프라 하드웨어 노드가 다운되면 데이터가 유실될 위험이 있음",
    quiz: [
      {
        type: "OX",
        question: "ElastiCache는 영구적인 원본 데이터 백업 마스터 허브 장치로 단독 운영하는 것이 강하게 권장된다.",
        answer: "X",
        explanation: "휘발성을 띠는 인메모리 캐시 솔루션이므로 영구 보관용 관계형 DB나 NoSQL의 앞단 서포터 캐시 레이어로 씀"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "AWS ElastiCache에서 완전 관리형 아키텍처로 드라이브 가능한 검증된 두 가지 대표 오픈소스 인메모리 엔진 프로토콜은?",
        options: ["MySQL & Oracle", "Redis & Memcached", "MongoDB & Cassandra", "PostgreSQL & SQLite"],
        answer: "Redis & Memcached",
        explanation: "업계 표준 인메모리 캐싱 프레임워크인 Redis와 Memcached 프로토콜과 높은 호환성을 제공함"
      }
    ]
  },
  {
    id: "aurora",
    category: "Database",
    title: "Amazon Aurora",
    summary: "클라우드 네이티브 환경에 맞춰 스토리지 가상화 레이어를 혁신하여 처리량과 내구성을 높인 AWS 전용 고성능 관계형 DB 엔진",
    analogy: "외형 프레임 인터페이스는 표준 승용차 규격(MySQL 등 호환)이나 하부 엔진 구성을 특수 스포츠카 규격으로 고도 개조한 상태",
    practicalUse: "대규모 커머스 결제 데이터 처리 환경에서 일반 오픈소스 DB 사양을 초과하는 자동 디스크 볼륨 확장성이 요구될 때",
    confusionPoint: "MySQL 및 PostgreSQL 애플리케이션 코드는 수정 없이 그대로 사용할 수 있음",
    quiz: [
      {
        type: "OX",
        question: "Amazon Aurora DB 아키텍처는 가상 스토리지 볼륨이 유저의 수동 디스크 할당 명령 없이 데이터 유입량에 맞춰 자동 확장된다.",
        answer: "O",
        explanation: "클라우드 최적화 분산 스토리지 아키텍처가 적용되어 물리 디스크 확장을 수동으로 유도할 필요가 없음"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "Amazon Aurora의 기본 스토리지 다중화 메커니즘 설명으로 올바른 것은?",
        options: ["단 하나의 디스크 장치에 싱글 모드로 데이터를 밀봉 보관한다.", "3개 가용 영역(AZ)에 걸쳐 데이터를 총 6방향으로 자동 복제 배포하여 데이터 내구성을 유지한다.", "로컬 인스턴스 스토어 메모리에만 임시 저장한다.", "VPC 외부 인터넷 퍼블릭 스토리지 영역으로 실시간 평문 유출 처리를 수행한다."],
        answer: "3개 가용 영역(AZ)에 걸쳐 데이터를 총 6방향으로 자동 복제 배포하여 데이터 내구성을 유지한다.",
        explanation: "Aurora는 하부 데이터 복제를 3개 AZ 가상 스토리지 클러스터 공간에 걸쳐 6중화로 분산 기록함"
      }
    ]
  },

  // ==========================================
  // 6. Security (26~30)
  // ==========================================
  {
    id: "iam",
    category: "Security",
    title: "IAM (Identity and Access Management)",
    summary: "AWS 리소스에 대한 개별 사용자의 인증(Authentication) 및 세부 접근 권한 인가(Authorization)를 중앙 제어하는 서비스",
    analogy: "회사 로비에서 전 직원에게 직급과 소속 부서 권한 등급에 따라 선별적으로 허가된 보안실 출입 사원증을 부여하는 것",
    practicalUse: "신입 엔지니어의 계정에 특정 S3 버킷에 대한 조회(Read) 권한 스크립트만 제한적으로 부여하고자 할 때 사용",
    confusionPoint: "VPC 내부 네트워크 망에 구속되지 않고 전 AWS 글로벌 인프라 영역에 공통 반영되는 전역 서비스임",
    quiz: [
      {
        type: "OX",
        question: "AWS 최초 가입 시 발급되는 '루트 사용자(Root User)' 계정은 모든 권한을 포함하므로 개발 운영자가 매일 일상 작업용으로 로그인하여 상시 쓰는 방식이 권장된다.",
        answer: "X",
        explanation: "루트 계정은 관리적 리스크가 크므로 권한을 제한한 개발 업무용 IAM 유저를 별도 생성해 접근하는 것이 모범 사례임"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "사람 개인이 아니라 EC2 인스턴스나 Lambda 함수처럼 AWS 서비스에 다른 AWS 자원을 제어할 수 있는 임시 자격 증명 권한을 위임할 때 사용하는 IAM 엔티티는?",
        options: ["IAM User (사용자)", "IAM Group (그룹)", "IAM Role (역할)", "IAM Credentials (자격증명)"],
        answer: "IAM Role (역할)",
        explanation: "서비스 객체나 제3의 논리 주체에 영구 비밀번호 노출 없이 임시 보안 토큰 권한을 신탁하는 장치는 IAM Role(역할)임"
      }
    ]
  },
  {
    id: "iam-policy-vs-role",
    category: "Security",
    title: "IAM 정책 vs 역할",
    summary: "수행 가능한 허가 내역을 기술한 JSON 문서(Policy)와 이를 임시로 위임받아 장착할 수 있는 자격 객체(Role)",
    analogy: "정책은 '서류상 적힌 출입 통제 구역 인가 리스트', 역할은 '특정 업무 수행자만 타이틀을 임시로 빌려 쓸 수 있는 마스터 보안 완장'",
    practicalUse: "특정 EC2 인스턴스가 S3 버킷 내 자원을 스캔할 수 있게 'S3 전용 정책'을 바인딩한 'EC2 커스텀 역할'을 생성해 매핑",
    confusionPoint: "IAM 정책(Policy) 기술문서 자체는 단독 구동하지 않고 사용자, 그룹, 역할 같은 주체에 연결(Attach)되어야 효력이 생김",
    quiz: [
      {
        type: "OX",
        question: "하나의 고유한 JSON IAM 정책(Policy) 문서를 다수의 독립된 IAM 역할(Role)이나 사용자 계정에 중복 연결하여 권한을 다중화할 수 있다.",
        answer: "O",
        explanation: "공통 권한 정의용 정책 문서는 모듈화된 오브젝트이므로 여러 엔티티에 다중 결합(Attach)이 가능함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "IAM 정책 기술 JSON 스크립트 내에서 특정 API 요청 행위의 명시적 허가(Allow) 또는 차단(Deny) 여부를 결정짓는 구문 키워드는?",
        options: ["Principal", "Effect", "Action", "Resource"],
        answer: "Effect",
        explanation: "Effect(효과) 항목의 밸류값을 'Allow' 혹은 'Deny'로 선언해 타겟 동작의 통제 성격을 최종 지정함"
      }
    ]
  },
  {
    id: "kms",
    category: "Security",
    title: "KMS (Key Management Service)",
    summary: "클라우드 서비스에 저장되는 다양한 데이터를 암호화하기 위해 암호화 키를 안전하게 생성, 제어, 보관해주는 관리형 서비스",
    analogy: "중요 자산이 담긴 금고의 암호화 마스터 키를 전문적으로 통제 및 불법 복제 방지 처리해주는 독립 은행 보안 관리실",
    practicalUse: "S3 버킷 내 기밀 문서나 RDS 스토리지 디스크 전체를 AWS 관리형 키 솔루션으로 안전하게 저장 암호화(Data at Rest)할 때",
    confusionPoint: "KMS는 암호화에 필요한 디지털 키의 생명주기를 통제할 뿐이며 고객의 대용량 로우 데이터를 직접 보관하지 않음",
    quiz: [
      {
        type: "OX",
        question: "KMS 내부에 내장된 고객 마스터 키(CMK)의 원본 바이너리 값 자체는 보안 원칙상 평문 상태로 AWS 외부 환경으로 추출해 나갈 수 없다.",
        answer: "O",
        explanation: "하드웨어 보안 모듈(HSM)의 강력한 내부 통제를 받으므로 마스터 키 데이터 자체는 안전하게 난독화 밀봉 보관됨"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "KMS와 고유 통합을 이루어 저장 데이터 레벨의 암호화를 간단한 옵션 체크로 연동할 수 있는 대상 서비스군이 아닌 것은?",
        options: ["Amazon EBS 볼륨", "Amazon S3 버킷 저장소", "Amazon RDS 데이터베이스", "AWS Internet Gateway 통신 통로"],
        answer: "AWS Internet Gateway 통신 통로",
        explanation: "인터넷 게이트웨이는 실시간 트래픽 패킷 통과용 전송 통로이므로 하드디스크 지향 저장 데이터 암호화(KMS) 대상 영역이 아님"
      }
    ]
  },
  {
    id: "secrets-manager",
    category: "Security",
    title: "Secrets Manager",
    summary: "데이터베이스 인증 정보, API 서비스 인증키 등 하드코딩 위험성이 높은 기밀 정보를 안전하게 암호화 보관 및 조회하는 서비스",
    analogy: "소스코드 텍스트에 패스워드를 박아두는 대신 필요할 때마다 시스템 API 호출로 동적 열람하는 가상 중앙 보안 금고",
    practicalUse: "애플리케이션 소스코드 내부에서 DB 연결용 평문 암호를 지우고 런타임 중 Secrets Manager 호출로 계정 정보 수집",
    confusionPoint: "데이터 저장 기능 외에도 타겟 RDS 비밀번호를 연동된 주기에 맞춰 자동으로 변경(교체, Rotation)하는 기능 제공",
    quiz: [
      {
        type: "OX",
        question: "Secrets Manager를 활용하면 백엔드 애플리케이션 코드를 수정하거나 다시 컴파일 배포하지 않고도 DB 비밀번호의 주기적 자동 교체 처리가 가능하다.",
        answer: "O",
        explanation: "내장된 람다 연동 암호 로테이션 스케줄러가 알아서 DB 인프라와 기밀 정보 값을 정기 동기화 교체해줌"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "Git 레포지토리 등으로 소스코드가 유출되었을 때 중요한 서드파티 토큰 정보나 DB 접속 계정이 동시 탈취되는 보안 재해를 막는 도구는?",
        options: ["IAM Policy Document", "AWS Secrets Manager", "Route 53 Routing Policy", "CloudWatch Metrics Viewer"],
        answer: "AWS Secrets Manager",
        explanation: "비밀번호 및 중요 API 접속 자격 증명을 중앙 통제형 기밀 저장소로 격리해 외부 노출을 제어하는 인프라 서비스임"
      }
    ]
  },
  {
    id: "aws-shield-and-waf",
    category: "Security",
    title: "AWS Shield & WAF",
    summary: "외부 악성 유저의 분산 서비스 거부 공격(DDoS) 및 웹 취약점 해킹 시도를 탐지 차단하는 전면 보안 인프라",
    analogy: "Shield는 유입 도로 통제로 차량 시위대 폭증을 걸러주는 대형 방패, WAF는 입장객의 가방 내부 불법 악성 흉기를 색출하는 웹 탐지 게이트",
    practicalUse: "웹 애플리케이션 서비스를 타겟으로 유입되는 SQL 인젝션, XSS(크로스 사이트 스크립팅) 등 7계층 웹 해킹 패턴 필터링 차단",
    confusionPoint: "보안 그룹은 3/4계층 IP와 포트만 검증하지만 WAF는 HTTP 패킷 내부 문자열 콘텐츠 구성 상태까지 세부 심사함",
    quiz: [
      {
        type: "OX",
        question: "AWS WAF는 주로 OSI 3계층 및 4계층 영역에서 도출되는 네트워크 볼륨 기반 대규모 DDoS 공격 방어만을 전담하는 전문 도구이다.",
        answer: "X",
        explanation: "인프라 대규모 디도스 공격은 AWS Shield가 제어하며 WAF는 7계층(Application) 애플리케이션 레이어 보안 필터링을 맡음"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "특정 유해 국가 IP 대역의 진입을 막거나 HTTP 요청 문자열 패턴 내부에 포함된 악성 코드 인젝션 행위를 스캔 차단하는 컴포넌트는?",
        options: ["Security Group 방화벽", "Network ACL 리스트", "AWS WAF (Web Application Firewall)", "AWS Shield Standard 인프라"],
        answer: "AWS WAF (Web Application Firewall)",
        explanation: "HTTP/HTTPS 프로토콜 데이터의 유해 구문을 파싱하여 고도화된 탐지 차단 규칙을 적용하는 방화벽은 WAF임"
      }
    ]
  },

  // ==========================================
  // 7. DevOps (31~35)
  // ==========================================
  {
    id: "cicd",
    category: "DevOps",
    title: "CI / CD",
    summary: "애플리케이션 소스코드의 통합, 빌드, 테스트 및 프로덕션 서버로의 배포 전 과정을 자동화하는 파이프라인 방법론",
    analogy: "원재료를 공정 투입구에 넣으면 조립 가공과 품질 검사, 포장 배송 상차까지 일련의 벨트로 자동 처리되는 컨베이어 인프라",
    practicalUse: "개발자가 소스코드를 형상관리 마스터 브랜치에 푸시하는 즉시 자동으로 테스트가 완료되어 실 가동 EC2 인프라에 반영될 때",
    confusionPoint: "CI는 지속적 통합(자동 빌드/테스트), CD는 지속적 제공 및 배포(실 서비스 인프라 자동 반영)를 뜻함",
    quiz: [
      {
        type: "OX",
        question: "CI/CD 자동화가 확립되면 운영 엔지니어가 변경 배포 시마다 매번 서버에 직접 원격 접속하여 수동으로 재시작할 필요성이 줄어든다.",
        answer: "O",
        explanation: "수동 프로세스로 인한 휴먼 에러를 제거하고 소스 정합성과 빌드 신뢰성을 확보해주는 자동화 공정임"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "CI/CD 자동화 파이프라인의 핵심 설계 목표 가치관과 거리가 먼 항목은?",
        options: ["릴리스 배포 주기의 단축 및 신속성 향상", "수동 수작업 조작 축소를 통한 배포 안정성 확보", "가상 네트워크 인프라 대역 비용의 직접적 정산 감축", "자동화된 유닛 테스트를 통한 애플리케이션 품질 모니터링 보장"],
        answer: "가상 네트워크 인프라 대역 비용의 직접적 정산 감축",
        explanation: "CI/CD는 소프트웨어 딜리버리 공정 효율성 증대용 자동화 체계이며 클라우드 자체의 가상 네트워크 사용료 비용을 직접 줄여주는 기술은 아님"
      }
    ]
  },
  {
    id: "codepipeline",
    category: "DevOps",
    title: "AWS CodePipeline",
    summary: "소스 수집, 빌드 테스트, 실 서버 배포 단계의 릴리스 프로세스 전체 단계를 시각화 관리해주는 완전 관리형 워크플로우 서비스",
    analogy: "자동화 공정 라인에서 전 공정 부품 이송 및 다음 공정 유기적 가동을 관리 감독하는 메인 시스템 컨트롤러",
    practicalUse: "GitHub 코드 변경 감지 시 CodeBuild를 구동시켜 컴파일하고, 통과 결과물을 CodeDeploy로 전송하도록 파이프라인을 엮을 때",
    confusionPoint: "CodePipeline 자체는 소스 코드를 빌드하거나 직접 기계어로 번역하지 않고 개별 전용 도구의 순차 실행 흐름만 제어함",
    quiz: [
      {
        type: "OX",
        question: "AWS CodePipeline 서비스 환경을 구성할 때 소스 코드 저장소는 오직 AWS 전용인 CodeCommit 자원만 호환 결합할 수 있다.",
        answer: "X",
        explanation: "업계 표준으로 많이 쓰이는 GitHub, Bitbucket 등 외부 퍼블릭/프라이빗 소스 저장소와도 긴밀히 통합 연동됨"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "전체 DevOps 도구 세트 중 소스코드를 컴파일하고 테스트 가동하여 배포용 가동 아티팩트(zip, jar 등) 생성을 전담하는 툴은?",
        options: ["AWS CodeCommit", "AWS CodeBuild", "AWS CodeDeploy", "AWS CodePipeline"],
        answer: "AWS CodeBuild",
        explanation: "독립된 가상 컨테이너 컴파일 환경에서 선언된 스크립트대로 빌드 및 단위 테스트를 수행해내는 주체는 CodeBuild임"
      }
    ]
  },
  {
    id: "codedeploy-strategies",
    category: "DevOps",
    title: "배포 전략 (In-place / Blue-Green)",
    summary: "운영 환경 서비스 중단 손실을 방어하고 안정적으로 신규 버전 소스코드를 인프라에 안착시키는 방법론",
    analogy: "In-place는 손님이 있는 자리에서 부품을 순차 수리하는 리모델링, Blue-Green은 신축 건물을 세팅 후 유저 이동 통로만 일시에 바꾸는 이주 전략",
    practicalUse: "웹 서버 배포 도중 에러가 확인되었을 때, 트래픽 라우팅 주소를 구버전 인프라로 즉시 롤백하기 위해 구조 설계 시 활용",
    confusionPoint: "롤링이나 제자리(In-place) 배포와 달리 블루-그린 방식은 일시적으로 동일 사양의 인프라 그룹이 2배로 가동되어 요금이 늘어날 수 있음",
    quiz: [
      {
        type: "OX",
        question: "제자리 배포(In-place) 방식은 가동 중인 기존 서버 인프라 자체에 소스를 덮어쓰므로 배포 진행 도중 순간적인 처리 용량 감소가 동반될 수 있다.",
        answer: "O",
        explanation: "실제 가동 인스턴스를 하나씩 내리거나 변경하므로 순간 가용 인프라 비율이 떨어지는 트레이드 오프가 있음"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "구버전 환경(Blue) 인프라와 병렬로 동일한 구조의 신버전 인프라(Green)를 구성 후 로드밸런서의 가상 통로 방향을 일괄 전환하는 배포 기법은?",
        options: ["In-place Deployment", "Rolling Deployment", "Blue-Green Deployment", "Recreate Deployment"],
        answer: "Blue-Green Deployment",
        explanation: "신구 버전의 하드웨어 인프라 인스턴스 환경을 통째로 이원화 구성 대조하여 무중단 라우팅 스위칭을 유도하는 기법은 Blue-Green 배포임"
      }
    ]
  },
  {
    id: "gitops",
    category: "DevOps",
    title: "GitOps",
    summary: "클라우드 인프라 및 애플리케이션 구성 설정을 선언적 코드로 Git 저장소에 넣어 배포 및 동기화를 추적 제어하는 DevOps 실천 방식",
    analogy: "현장 반장에게 구두 지시를 하는 대신 최종 마스터 설계 도면을 수정 보관소에 제출하면 자동 빌더 로봇이 현장을 실시간 도면화하는 구조",
    practicalUse: "쿠버네티스용 배포 매니페스트 YAML 코드를 Git에 push하면 배포 에이전트 도구가 감지하여 클러스터 실제 상태와 자동 일치화",
    confusionPoint: "명령줄 인터페이스(CLI)로 인프라를 변경하는 형태가 아닌, Git 커밋 상태를 인프라 구성의 '진실의 단일 원천'으로 삼음",
    quiz: [
      {
        type: "OX",
        question: "GitOps 환경이 확립된 아키텍처에서는 엔지니어가 직접 운영 쿠버네티스 마스터 서버에 붙어 수동 명령줄(CLI)로 임시 설정을 변경하는 행위를 지양한다.",
        answer: "O",
        explanation: "모든 인프라 형상 상태는 수동 수기 조작이 아닌 오직 Git 커밋 내역의 변경 및 승인 이력(PR) 흐름으로만 제어해야 정합성이 확보됨"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "GitOps 방법론을 정의하는 핵심 아키텍처적 가치 사상과 부합하지 않는 설명은?",
        options: ["시스템의 상태를 선언적 코드로 기술 관리", "Git의 버전 관리 메커니즘 및 접근 통제 활용", "실제 가동 중인 인프라 서버 노드에 직접 원격 SSH 터미널 접속 후 라이브 수동 편집 빈번화", "선언된 소스 코드 상태와 가동 리소스 간의 지속적 자동 동기화 조율 수행"],
        answer: "실제 가동 중인 인프라 서버 노드에 직접 원격 SSH 터미널 접속 후 라이브 수동 편집 빈번화",
        explanation: "라이브 인프라에 직접적인 수동 로컬 수정을 가하는 행위는 GitOps의 선언적 버전 추적 구조 가치를 훼손하는 행위임"
      }
    ]
  },
  {
    id: "route53",
    category: "DevOps",
    title: "Route 53",
    summary: "AWS가 제공하는 높은 가용성의 관리형 클라우드 도메인 이름 시스템(DNS) 서비스",
    analogy: "인터넷 세상의 가상 전화번호부(외우기 쉬운 영문 주소를 실제 컴퓨터 사설/공용 IP 주소로 연동)",
    practicalUse: "사용자가 구매한 도메인 주소를 서비스 중인 AWS 애플리케이션 로드 밸런서(ALB) 엔드포인트에 매핑할 때",
    confusionPoint: "단순 DNS 주소 변환 외에 서버의 상태를 체크해 정상 서버로만 트래픽을 넘기는 헬스 체크 기능도 포함함",
    quiz: [
      {
        type: "OX",
        question: "Route 53은 도메인을 IP 주소로 변환하는 기능 외에, 대상 서버의 장애를 감지하여 유저 통신을 자동 우회시키는 라우팅 제어도 가능하다.",
        answer: "O",
        explanation: "상태 검사(Health Check) 메커니즘 및 장애 조치(Failover) 정책을 지원하여 고가용성 인프라를 보조함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "Route 53에서 AWS 내부 자원(ALB, S3 웹 호스팅 등)에 도메인을 비용 효율적으로 직결하기 위해 제공하는 특수 레코드 유형은?",
        options: ["CNAME Record", "A Record", "Alias (별칭) Record", "TXT Record"],
        answer: "Alias (별칭) Record",
        explanation: "별칭(Alias) 레코드는 AWS 리소스의 동적 IP 변화를 DNS 레벨에서 자동 추적 및 매핑하며 쿼리 비용이 없음"
      }
    ]
  },

  // ==========================================
  // 8. Container (36~40)
  // ==========================================
  {
    id: "container-concept",
    category: "Container",
    title: "컨테이너 (Container)",
    summary: "호스트 OS 커널을 공유하며 애플리케이션 구동에 필수적인 소스코드, 라이브러리, 종속 환경을 격리해 담은 가벼운 실행 단위",
    analogy: "표준 규격에 맞춰 제작되어 어떤 수송선(OS)에 싣든 내부 내용물이 변치 않고 즉시 가동되는 물류 컨테이너 박스",
    practicalUse: "로컬 PC 개발 환경에서는 정상 작동하는 웹 코드가 특정 리눅스 버전 운영 서버에 배포 시 환경 설정 꼬임으로 종료되는 현상을 방지할 때",
    confusionPoint: "독립된 게스트 OS 커널을 각각 내장하는 하이퍼바이저 기반 가상머신(VM)과 달리 호스트 OS 자원을 공유하여 시작 속도가 빠름",
    quiz: [
      {
        type: "OX",
        question: "컨테이너 기술은 시스템 가상화 구현 시 내부에 독립된 무거운 자체 게스트 OS 커널을 개별 탑재하여 실행하는 구조를 취한다.",
        answer: "X",
        explanation: "호스트 컴퓨터의 물리 OS 커널 레이어를 공유하므로 가상머신(VM) 대비 오버헤드가 적고 리소스 가벼움"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "컨테이너 표준 기술 규격을 정착 및 대중화시켰으며 격리 빌드, 배포, 런타임을 지원하는 가장 표준적인 컨테이너 플랫폼 엔진은?",
        options: ["VirtualBox Engine", "Docker (도커)", "Kubernetes Orchestrator", "VMware Hypervisor"],
        answer: "Docker (도커)",
        explanation: "도커(Docker)는 간결한 이미징 규격을 확립하여 컨테이너 대중화 인프라 혁신을 이끈 기술 플랫폼임"
      }
    ]
  },
  {
    id: "dockerfile",
    category: "Container",
    title: "Dockerfile",
    summary: "도커 컨테이너 이미지를 생성하기 위해 필요한 베이스 OS 지정, 파일 복사, 명령어 실행 절차를 순차 서술한 정적 스크립트 도면",
    analogy: "완제품 피규어를 공장에서 매번 똑같이 찍어내기 위해 단계별 플라스틱 조립 순서를 상세 기술한 가이드 설명서",
    practicalUse: "내 자바 컴파일 소스코드를 컨테이너 이미지화하기 위해 `FROM openjdk`, `COPY`, `RUN` 등의 환경 구성 지시어를 텍스트 파일로 구현할 때",
    confusionPoint: "Dockerfile 자체는 단순 텍스트 지시서 문서 파일이며, `docker build` 명령을 통과해야 실행 가능한 파일 형태의 '이미지'가 생성됨",
    quiz: [
      {
        type: "OX",
        question: "Dockerfile 내에 정의하는 환경 빌드 인스트럭션 명령줄(RUN, COPY 등)들은 실행 시 레이어(Layer) 형태로 한 층씩 누적 적층되어 저장된다.",
        answer: "O",
        explanation: "도커 이미지는 독립 레이어 스택 구조를 가지므로 변경사항이 없는 레이어는 캐시로 재활용하여 빌드 처리 속도를 가속함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "Dockerfile 작성 규칙 중 빌드가 완료된 최종 도커 컨테이너가 최초 인스턴스 가동할 때 메인 프로세스로 기본 수행해야 할 핵심 기본 명령어를 기재하는 지시어는?",
        options: ["FROM", "RUN", "EXPOSE", "CMD"],
        answer: "CMD",
        explanation: "CMD 지시어는 이미지 배포 실행 시점에 컨테이너 내부 환경에서 기동할 기본 백그라운드 엔트리 명령어 라인을 지정함"
      }
    ]
  },
  {
    id: "docker-image-vs-container",
    category: "Container",
    title: "도커 이미지 vs 컨테이너",
    summary: "필수 패키지가 빌드 완료되어 정적 저장된 읽기 전용 상태(Image)와 그것이 가상 메모리에 로드되어 실제 구동 중인 독립 실체(Container)",
    analogy: "도커 이미지는 정해진 배합 규격을 고수한 정형화된 '붕어빵 성형 틀', 컨테이너는 그 틀을 사용해 실시간 구워져 동작하는 '개별 붕어빵 인스턴스'",
    practicalUse: "표준 배포용 Nginx 마스터 이미지 한 장을 인프라 레포지토리에서 다운받아 로컬 장비 위에 포트 번호만 변경해 가며 컨테이너 3대를 동시 병렬 가동",
    confusionPoint: "이미지는 변하지 않는 읽기 전용(ReadOnly) 파일이며, 컨테이너 가동 중 발생하는 로그 파일 쓰기 등은 컨테이너 고유 임시 레이어에 개별 기록됨",
    quiz: [
      {
        type: "OX",
        question: "실행 중인 특정 도커 컨테이너 내부 터미널로 진입하여 특정 설정 파일을 수정 저장하면 그 컨테이너의 모태가 된 원본 도커 이미지 내용물도 자동 수정된다.",
        answer: "X",
        explanation: "원본 이미지는 불변(Immutable) 상태로 보존되며 수정 정보는 오직 해당 컨테이너 실행 인스턴스의 쓰기 가능 레이어 구역에만 한정 반영됨"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "도커 아키텍처에서 이미지(Image)와 컨테이너(Container)의 구동 관계 구조를 올바르게 정의한 표현은?",
        options: ["컨테이너를 최종 압축 컴파일하면 파일 형태의 정적 이미지가 직조된다.", "이미지는 정적인 설계 클래스 관점이며 컨테이너는 이를 메모리에 구동시킨 액티브 인스턴스이다.", "고유 이미지 한 개 명세로는 오직 단 하나의 컨테이너만 인프라에 바인딩할 수 있다.", "도커 이미지는 실행 중에 상시 데이터를 동적 다운로드받아야만 컨테이너로 존속 가능하다."],
        answer: "이미지는 정적인 설계 클래스 관점이며 컨테이너는 이를 메모리에 구동시킨 액티브 인스턴스이다.",
        explanation: "객체지향 프로그래밍의 설계물(Class)과 실체 오브젝트(Instance)의 역할 관계와 구조적 일관성을 지님"
      }
    ]
  },
  {
    id: "ecs",
    category: "Container",
    title: "ECS (Elastic Container Service)",
    summary: "AWS 인프라 환경 내에서 다수의 도커 컨테이너를 효율적으로 배포, 스케줄링, 확장 관리해주는 AWS 고유 완전 관리형 컨테이너 오케스트레이션 서비스",
    analogy: "대형 항구 인프라 현장에서 수많은 화물 박스 배치 조율 및 선박 선적 임무를 조율하는 전문 항만 관제 사령탑",
    practicalUse: "쿠버네티스 아키텍처의 복잡성 도입 없이 표준 도커 기반 마이크로서비스 컨테이너들을 ALB 로드밸런서와 빠르게 연동 배포할 때 사용",
    confusionPoint: "AWS 고유 전용 통제 서비스이므로 오픈소스 쿠버네티스의 선언형 YAML 표준 규격 매니페스트 문법과는 호환되지 않음",
    quiz: [
      {
        type: "OX",
        question: "AWS ECS 인프라 환경에서 컨테이너의 이미지 위치 정보, vCPU 사양, 메모리 제한, 포트 포워딩을 서술하는 최소 명세 규격을 'Task Definition(작업 정의)'이라 한다.",
        answer: "O",
        explanation: "Task Definition(작업 정의) 파일은 ECS 컴포넌트가 컨테이너 세트를 가동하기 위해 수신하는 필수 청사진 텍스트 양식임"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "AWS ECS 관리 체계에서 실제 메모리에 가동되어 라이브 상태로 실행되는 독립된 컨테이너의 실체 실행 단위를 지칭하는 단어는?",
        options: ["Cluster (클러스터)", "Service (서비스)", "Task (작업)", "Container Instance (인스턴스)"],
        answer: "Task (작업)",
        explanation: "작업(Task)은 작업 정의 명세서대로 생성되어 직접 구동되는 ECS 내부의 컨테이너 실행 실체 패키지 단위임"
      }
    ]
  },
  {
    id: "fargate",
    category: "Container",
    title: "파게이트 (Fargate)",
    summary: "컨테이너 가동에 필요한 하부 가상 EC2 서버 인프라 관리 및 프로비저닝을 추상화하여 제거해주는 서버리스 컨테이너 컴퓨팅 엔진",
    analogy: "물류창고 부지를 구매하여 직접 지키고 시설 정비를 할 필요 없이 내 짐 박스(컨테이너)의 용량 단가만큼만 점유 사용 비용을 내는 공유 창고",
    practicalUse: "ECS 서비스 운영 시 노드가 될 개별 가상 서버 OS 패치 작업이나 Auto Scaling 인프라 제어 공수를 제거하고 컨테이너 가동에 집중하고자 할 때",
    confusionPoint: "Fargate는 완전 독립된 별개 단독 인프라 서비스라기보다는 ECS나 EKS 엔진의 하부를 지탱하는 '서버리스 컴퓨팅 가상 인프라 유형 옵션'임",
    quiz: [
      {
        type: "OX",
        question: "AWS Fargate 컴퓨팅 모드를 선택하여 컨테이너 서비스를 가동하는 인프라 구조에서는 호스트 EC2 OS의 보안 취약점 업데이트 작업을 엔지니어가 직접 수행할 책임이 없다.",
        answer: "O",
        explanation: "공동 책임 모델 관점에서 가상 컴퓨팅 하부 레이어의 패치 및 인프라 프로비저닝 주권은 완전 관리형 백단인 AWS 책임 영역으로 전가됨"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "AWS Fargate 서버리스 엔진의 주요 요금 정산 청구 산정 기준은?",
        options: ["가동 컨테이너에 내장된 애플리케이션 소스코드 라인 수", "컨테이너에 예약 할당한 vCPU 자원 크기와 메모리 용량 사양 및 실제 초 단위 구동 가동 시간", "인프라 망에 유입된 HTTP 패킷의 전체 헤더 텍스트 Byte 크기 합산", "VPC 내 서브넷에 연결된 가상 사설 IP 주소의 총 식별 개수"],
        answer: "컨테이너에 예약 할당한 vCPU 자원 크기와 메모리 용량 사양 및 실제 초 단위 구동 가동 시간",
        explanation: "사전에 지정 세팅한 가상 컴퓨팅 밀도 사양(vCPU, RAM 크기) 및 컨테이너가 켜져서 점유 가동한 물리 시간만큼 가변 청구됨"
      }
    ]
  },

  // ==========================================
  // 9. Kubernetes (41~44)
  // ==========================================
  {
    id: "kubernetes-concept",
    category: "Kubernetes",
    title: "쿠버네티스 (K8s)",
    summary: "대규모 분산 환경에서 다량의 컨테이너화된 애플리케이션 배포, 확장, 로드밸런싱 및 관리를 자동화하는 오픈소스 컨테이너 오케스트레이션 플랫폼",
    analogy: "대형 무역 항구에서 수천 개의 컨테이너 하역, 화물선 적재, 고장 박스 긴급 복구를 총괄 관리하는 중앙 통합 물류 제어 센터",
    practicalUse: "멀티 클라우드나 온프레미스 인프라 환경 전반에 걸쳐 하부 벤더 종속 없이 수백 개의 마이크로서비스(MSA)를 표준 컨테이너 양식으로 통합 제어할 때",
    confusionPoint: "도커 기술의 대체제가 아니며 도커 등의 엔진으로 가동되는 컨테이너 다수를 효율적으로 자동 관리해주는 대규모 제어 솔루션임",
    quiz: [
      {
        type: "OX",
        question: "쿠버네티스는 특정 컨테이너가 예기치 않게 비정상 종료되면 시스템이 스스로 이를 감지하여 새 인스턴스로 자동 재구동하는 자가 치유(Self-healing) 기능을 지원한다.",
        answer: "O",
        explanation: "선언적 상태(Desired State) 정책 명세를 항시 모니터링하여 실제 인프라 문제 시 복구 태스크를 자동 유도함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "쿠버네티스를 칭하는 약어 표기 기호가 'K8s'로 정착 명명된 주된 명칭 이유는?",
        options: ["초기 엔지니어 표준 버전 8의 출시 명세 기념", "알파벳 스펠링 구조상 'K'와 's' 문자 사이에 정확히 8개의 글자(ubernete)가 내포되어 있어서", "8종의 핵심 인프라 데몬 컴포넌트로만 구성되어서", "바이너리 주소 연산이 8진법 모드로 설계되어서"],
        answer: "알파벳 스펠링 구조상 'K'와 's' 문자 사이에 정확히 8개의 글자(ubernete)가 내포되어 있어서",
        explanation: "Kubernetes 단어 내 K와 s 사이 글자 수가 8자이므로 이를 엔지니어링 생태계에서 'K8s'라는 축약어로 통칭함"
      }
    ]
  },
  {
    id: "k8s-pod",
    category: "Kubernetes",
    title: "파드 (Pod)",
    summary: "쿠버네티스 아키텍처 환경 내에서 생성, 제어, 배포할 수 있는 컴퓨팅 자원의 가장 작고 기본적인 논리 실행 단위",
    analogy: "한 단짝 껍질 안에 보존되어 공간 운명을 공통 분담하며 성장하는 콩꼬투리 속의 작은 콩알 군집",
    practicalUse: "기본 웹 백엔드 컨테이너와 해당 인스턴스의 실시간 파일 로그를 외부로 안전하게 전송하는 사이드카(Sidecar) 보조 컨테이너를 한 묶음으로 통합 배포할 때",
    confusionPoint: "쿠버네티스는 컨테이너 단계를 개별 독립 제어하지 않으며 항상 Pod라는 최소 실행 래퍼 단위로 감싸서 스케줄링함",
    quiz: [
      {
        type: "OX",
        question: "동일한 단일 Pod 구성 공간 내부에서 공존하는 여러 다중 컨테이너들은 서로 사설 IP 주소 및 로컬 네트워크 포트 공간 영역을 상호 공유한다.",
        answer: "O",
        explanation: "동일 Pod 내 컨테이너들은 동일한 네트워크 네임스페이스를 쓰므로 내부에서 localhost 통신을 기반으로 유기적 교류가 가능함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "쿠버네티스 제어 클러스터가 배포 및 예약을 집행하는 인프라 상의 가장 최소 단위 리소스 명칭은?",
        options: ["Docker Container", "Pod (파드)", "Cluster Service", "Worker Node"],
        answer: "Pod (파드)",
        explanation: "쿠버네티스 가상화 스케줄러가 노드에 배치하고 수명주기를 관리하는 최소 논리 원자 단위는 Pod임"
      }
    ]
  },
  {
    id: "k8s-deployment-vs-service",
    category: "Kubernetes",
    title: "디플로이먼트 vs 서비스",
    summary: "컨테이너 파드의 수량 복제본 유지 및 롤링 업데이트를 관장하는 리소스(Deployment)와 파드 그룹에 고정 접근 경로를 제공하는 네트워크 리소스(Service)",
    analogy: "디플로이먼트는 '공장의 복제 로봇 3대를 항시 가동 상태로 감시 유지하라'는 지시서, 서비스는 '로봇이 고장 교체되어도 안내 창구 주소가 유지되는 통합 접견실'",
    practicalUse: "앱 서비스 소스 버전을 무중단 롤링 배포로 안전 전환할 땐 Deployment를, 해당 파드 인스턴스 집합에 안정적인 로드밸런싱 고정 내부 IP를 제공할 땐 Service 정의",
    confusionPoint: "Pod는 리스케줄링 시마다 가변 사설 IP가 매번 초기화되므로 영속 통신 진입점 역할을 해주는 Service 자원 결합이 요구됨",
    quiz: [
      {
        type: "OX",
        question: "쿠버네티스 생태계에서 특정 파드의 구동 복제본 개수를 동적으로 증감(Scaling)하고 업데이트를 지휘하는 리소스는 Service이다.",
        answer: "X",
        explanation: "파드 복제 수량 보장 및 롤링 무중단 업데이트 주기 추적 관리는 Deployment 리소스의 핵심 전담 역할임"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "클러스터 내에서 동적으로 소멸 및 재생성되는 Pod 군집들에 단일 네트워크 진입 주소를 매핑하고 트래픽 부하 분산을 매개해 주는 쿠버네티스 리소스 유형은?",
        options: ["Pod Entity", "Namespace Segment", "Service (서비스)", "ConfigMap Asset"],
        answer: "Service (서비스)",
        explanation: "가변적인 파드 인프라 앞단에서 영속적인 가상 IP 및 DNS 레벨 고정 라우팅 게이트를 성립시키는 객체는 Service임"
      }
    ]
  },
  {
    id: "eks",
    category: "Kubernetes",
    title: "EKS (Elastic Kubernetes Service)",
    summary: "쿠버네티스의 핵심 관리 컴포넌트인 컨트롤 플레인(Control Plane)의 다중화 및 구성을 AWS가 대행 관리해주는 마스터형 서비스",
    analogy: "가동 메커니즘이 난해한 자율주행 관제 인프라 센터 본부 건물은 AWS가 상시 운영해주고 유저는 실제 도로 위 달릴 운송 차량(워커 노드)에만 신경 쓰는 구조",
    practicalUse: "인프라 부서에서 마스터 노드 가상 인프라의 가용성 장애 복구를 수동 구축하지 않고, 신뢰성이 입증된 AWS 관리형 EKS로 쿠버네티스 클러스터 구축",
    confusionPoint: "마스터 컨트롤 플레인 인프라 구동 비용이 매 시간 단위로 별도 정산되므로 소규모 토이 실습 시에는 비용 계정을 사전에 유의해야 함",
    quiz: [
      {
        type: "OX",
        question: "AWS EKS 환경에서 클러스터가 개설되면 오픈소스 표준 쿠버네티스 제어 명령어 툴인 `kubectl` 인터페이스를 그대로 활용하여 인프라를 통제할 수 있다.",
        answer: "O",
        explanation: "표준 쿠버네티스 인증 규격을 준수하므로 오픈소스 에코시스템의 기존 툴킷들과 긴밀한 호환성을 유지함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "AWS EKS 클러스터 시스템 아키텍처 구조 중 k8s API 서버, 스케줄러 데몬, etcd 영속 저장소 등이 밀집하여 AWS가 인프라 고가용성을 직접 전담하는 구역은?",
        options: ["Worker Node Group", "Control Plane (컨트롤 플레인)", "Data Plane Subnet", "Fargate Host Profiler"],
        answer: "Control Plane (컨트롤 플레인)",
        explanation: "쿠버네티스의 중추 신경망인 마스터 클러스터의 인프라 백업 및 인가 제어 레이어를 Control Plane이라 부르며 AWS가 직접 가용성을 보장함"
      }
    ]
  },

  // ==========================================
  // 10. IaC / Terraform (45~47)
  // ==========================================
  {
    id: "iac-concept",
    category: "IaC / Terraform",
    title: "IaC (Infrastructure as Code)",
    summary: "웹 콘솔 UI 화면에서 마우스 클릭으로 클라우드를 구축하는 대신 사람이 읽을 수 있는 텍스트 구성 코드 문서로 인프라를 정의 및 자동 프로비저닝하는 방법론",
    analogy: "작업 인부에게 말로 인프라 요구 사항을 수기 전달하는 대신 표준화된 3D 캐드 디지털 설계 도면 파일을 기계에 주입해 건물을 자동 프린팅하는 시스템",
    practicalUse: "동일해야 하는 개발(Dev), 검증(Staging), 운영(Production) 인프라 가상 환경을 사람의 클릭 실수 없이 동일 형상으로 복제 배포할 때",
    confusionPoint: "초기 학습 비용과 파일 명세 형상 관리가 요구되나, 인프라의 모든 자산 히스토리를 Git의 텍스트 버전 커밋 이력으로 통제하는 장점을 지님",
    quiz: [
      {
        type: "OX",
        question: "IaC 방법론을 도입하면 과거 특정 시점의 인프라 네트워크 구조가 어떠했는지 텍스트 형상 백업 코드를 통해 추적할 수 있어 Git 버전 관리가 가능해진다.",
        answer: "O",
        explanation: "인프라 자체가 기계 가독성 코드 문서화로 변경되므로 변경 이력 분석 및 롤백, 피어 리뷰가 결합됨"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "코드로 인프라를 선언 관리하는 IaC 전용 전문 자동화 기술 도구 솔루션에 포함되지 않는 리소스는?",
        options: ["HashiCorp Terraform", "AWS CloudFormation", "Ansible Configuration Tool", "Amazon SQS Message Queue"],
        answer: "Amazon SQS Message Queue",
        explanation: "SQS는 AWS 클라우드가 파이프라인 내에서 제공하는 애플리케이션용 분산 메시지 큐 관리 제품이며 자산 코드화(IaC) 제어 도구가 아님"
      }
    ]
  },
  {
    id: "terraform-declarative",
    category: "IaC / Terraform",
    title: "테라폼과 선언적 코드 (Declarative)",
    summary: "인프라를 순차 빌드하는 구체적 행위 '과정 및 절차'를 코딩하는 것이 아닌, 도달하고자 하는 최종 지향점 '결과 상태'만 코드 명세에 기술하는 방식",
    analogy: "차량 내비게이션 조작 시 '시속 60키로 전진 후 우회전 연동해줘'라고 적는 대신 '가고자 하는 목적지 주소는 서울역이야'라고 찍으면 길을 자동 동기화하는 구조",
    practicalUse: "HCL 선언 언어로 `resource \"aws_vpc\"` 블록 최종 명세만 유지해 두면, 테라폼 엔진이 백단 클라우드 API 조회를 거쳐 생성 혹은 무시 작업을 판단 수행",
    confusionPoint: "동일 테라폼 선언 코드를 단순 반복 재실행한다고 해서 기 가동 중인 똑같은 가상 인스턴스 리소스가 이중으로 복제 생성되지 않음",
    quiz: [
      {
        type: "OX",
        question: "테라폼 구성 코드 내부에 특정 웹 인스턴스 수량을 총 3대로 정의 후 배포 적용을 완료한 상태에서, 코드를 일절 변경하지 않고 `apply` 명령을 재호출하면 총 6대로 서버가 늘어난다.",
        answer: "X",
        explanation: "선언적 모델은 최종 목표치 상태인 '총 3대' 상태 유지만을 관장하므로 이미 3대가 존재할 시 리프레시 조회 후 변경 없이 자동 스킵 처리함"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "테라폼 개발 워크플로우 중 코드를 실제 상용 클라우드에 배포 반영하기 바로 직전에 어떤 자원이 새로 삽입, 수정, 파괴될지 사전 시뮬레이션 상세 내역을 표기해주는 명령어는?",
        options: ["terraform init", "terraform plan", "terraform apply", "terraform destroy"],
        answer: "terraform plan",
        explanation: "plan 명령을 통해 인프라 엔지니어는 실제 배포 위험 요소를 사전 점검하고 선언 코드가 가져올 변경 파급 효과를 검증 검수할 수 있음"
      }
    ]
  },
  {
    id: "terraform-state",
    category: "IaC / Terraform",
    title: "테라폼 상태 파일 (tfstate)",
    summary: "로컬의 선언형 구성 소스코드와 실제 클라우드 인프라 상에 프로비저닝된 리소스들 간의 일치 매핑 관계 정보를 기록해 둔 테라폼 전용 메타 장부 파일",
    analogy: "자산 보관 창고 내부에 배치된 실물 품목들의 고유 자산 번호와 위치 좌표를 1대1 정밀 매칭해 관리하는 중앙 물류 원장 기록부",
    practicalUse: "개발 팀원 다수가 하나의 대규모 클라우드 인프라 코드를 동시 공동 편집할 때 상태 파일 충돌을 막고자 S3 원격 백엔드(Remote Backend) 저장소 및 DynamoDB 잠금 장치 연동 공유",
    confusionPoint: "이 `.tfstate` 상태 장부 텍스트 파일이 수동 삭제되거나 내부 데이터가 깨지면 테라폼이 기 구축된 실제 서버 인프라들을 인지하지 못하므로 관리가 중요함",
    quiz: [
      {
        type: "OX",
        question: "테라폼 운영 설계 시 프로젝트 상태 파일(.tfstate)은 보안 및 동기화를 위해 각 엔지니어 로컬 PC 내부 폴더에만 격리 소장하고 공유 전송을 금지하는 것이 정석이다.",
        answer: "X",
        explanation: "복수 엔지니어 협업 및 유실 복구 대비를 위해 AWS S3 등 원격 격리 스토리지 영역(Remote Backend)에 실시간 통합 관리하는 것이 모범 사례임"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "테라폼 아키텍처 생태계에서 `.tfstate` 파일이 수행하는 가장 본질적인 시스템 목적 기능 정의는?",
        options: ["AWS IAM 사용자의 비밀번호 암호 강도를 강제 인상하는 기능", "선언된 소스코드 스크립트 파일 요소와 클라우드 실제 활성 인프라 개체 간의 상태 링크 정보 기억 및 격차 판별", "로컬 도커 가상 이미지를 쿠버네티스 파드 파일로 자동 번역", "실시간 가동 가상 서버의 커널 트래픽 분석 및 대역폭 시각화 전송"],
        answer: "선언된 소스코드 스크립트 파일 요소와 클라우드 실제 활성 인프라 개체 간의 상태 링크 정보 기억 및 격차 판별",
        explanation: "테라폼 상태 파일은 작성 코드 내의 추상적 선언 명칭과 실제 AWS에서 발급한 물리 자원 ID 고유 식별 주소 간의 관계 징검다리 뼈대임"
      }
    ]
  },

  // ==========================================
  // 11. Monitoring (48~49)
  // ==========================================
  {
    id: "cloudwatch",
    category: "Monitoring",
    title: "클라우드워치 (CloudWatch)",
    summary: "AWS 리소스들의 시스템 CPU 사용률, 네트워크 대역폭, 원본 로그 텍스트 파일 등 지표 메트릭을 통합 수집하고 모니터링하는 관제 센터",
    analogy: "종합병원 집중 치료실 환자 몸에 장착하여 심박수, 혈압 추이를 실시간 모니터링하다 이상 임계치 도달 시 버저를 울리는 중앙 생체 신호 관제 장치",
    practicalUse: "특정 웹 가상 EC2 서버 인스턴스의 연산 자원 CPU 이용률 수치가 연속 5분간 80% 임계점을 초과할 때 운영 담당자 슬랙 메신저로 즉시 경고 알람(Alarm) 발송",
    confusionPoint: "기본 시스템 메트릭 수집은 추가 비용 없이 기본 제공되나, OS 내부 전용 메모리 상세 지표나 초 단위 고밀도 트래킹 시에는 비용이 가산됨",
    quiz: [
      {
        type: "OX",
        question: "CloudWatch 시스템 알람(Alarm) 임계치 경고 감지 트리거 기능을 이용하면 미리 정의해둔 Auto Scaling 그룹 스케일링 정책과 다이렉트 연동 동작을 유도할 수 있다.",
        answer: "O",
        explanation: "지표 임계치 도달 경보 신호가 스위치 역할을 하여 탄력적 인프라 확장 서버 증설(Scale-out) 코드를 연쇄 발동시킴"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "EC2 가상 OS 내부의 자체 런타임 웹 애플리케이션 특정 텍스트 파일 로그(예: `access.log` 등)를 CloudWatch Logs 허브로 중앙 집중 전송하기 위해 서버에 기동시키는 데몬 프로그램은?",
        options: ["CloudWatch Agent (에이전트)", "AWS Systems Manager Daemon", "CloudTrail Activity Router", "AWS X-Ray Diagnostic Service"],
        answer: "CloudWatch Agent (에이전트)",
        explanation: "가상 OS 내부 메모리나 개별 로컬 텍스트 경로 파일 데이터를 긁어 수집 허브인 CloudWatch로 안전 전송하려면 인프라 내부에 전용 CloudWatch 에이전트 설치 패치가 요구됨"
      }
    ]
  },
  {
    id: "cloudtrail",
    category: "Monitoring",
    title: "클라우드트레일 (CloudTrail)",
    summary: "AWS 계정 내부에서 가동된 모든 관리용 API 호출 및 사용자 작업 행적 기록을 투명하게 수집하는 보안 감사 및 규정 준수용 블랙박스 이력제",
    analogy: "주요 금융 기관 건물 내부 전 복도와 메인 제어실 개폐 스위치 바로 앞에 거치되어 작동하는 무인 24시간 보안 CCTV 기록 장치",
    practicalUse: "새벽 특정 시각에 상용 운영 환경의 마스터 DB 스토리지를 임의 삭제 조작한 IAM 계정 사용자 ID 명세와 접속 출발지 소스 IP 정보를 역추적 정밀 조사할 때",
    confusionPoint: "최근 90일간의 API 활동 내역 데이터 기록은 기본 제공되나, 영구 감사 목적인 장기 보관 시스템 구축 시에는 별도 추적(Trail) 활성화 설정을 통해 S3 버킷으로 로그를 추출 백업 보관 처리해야 함",
    quiz: [
      {
        type: "OX",
        question: "CloudTrail 서비스는 특정 EC2 인스턴스의 하드웨어 초당 실시간 웹 트래픽 분산 추이를 꺾은선 차트 그래픽 지표로 가시화 모니터링하는 데 가장 적합한 도구이다.",
        answer: "X",
        explanation: "시스템 리소스 성능 지표 추적은 CloudWatch의 고유 전문 관할 영역이며, CloudTrail은 주체자들의 '행위 활동 API 로그' 분석에 국한됨"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "어느 날 새벽 불상의 경로로 악성 EC2 가상 노드가 다량 생성되어 해킹 범죄 유입이 강력 의심될 때 콘솔 인프라 창에서 어떤 계정이 자원 생성 명령을 유도했는지 식별 감사하는 서비스는?",
        options: ["AWS CloudWatch Metric Stream", "AWS CloudTrail (클라우드트레일)", "IAM Trusted Advisor Hub", "VPC Flow Logs Network Analyzer"],
        answer: "AWS CloudTrail (클라우드트레일)",
        explanation: "콘솔 마우스 클릭, CLI 명령어 도구 스크립트 발동, SDK 프로그램 호출 등 AWS 전반을 움직인 모든 물리 API 호출 트랜잭션 수신 내역은 오직 CloudTrail에 상세 인덱싱 보관됨"
      }
    ]
  },

  // ==========================================
  // 12. Architecture (50)
  // ==========================================
  {
    id: "high-availability",
    category: "Architecture",
    title: "고가용성 (High Availability, HA)",
    summary: "인프라 시스템을 구성하는 특정 개별 부품이나 데이터 센터에 장애가 터지더라도 전체 IT 서비스 기능이 단절 없이 유지되는 시스템의 내구 가동 능력",
    analogy: "대형 여객기 운항 시 단일 엔진 고장 추락 재해를 방지하기 위해 좌우 날개 영역에 각각 독립된 제트 엔진을 다중 배치해 비행 지속 안정성을 높이는 기법",
    practicalUse: "하나의 서버 가용 영역(AZ) 데이터 센터가 낙뢰 정전으로 완전히 정지해도 다른 생존 AZ에 복제 가동 중이던 웹 서버 인스턴스로 로드밸런서가 트래픽을 자동 전송 통제",
    confusionPoint: "고가용성은 절대 고장 나지 않는 장비를 비싸게 조립하는 것이 아니라 '모든 자원은 반드시 언젠가 고장 난다'는 전제 하에 다중화(Redundancy) 백업 구조를 설계하는 것임",
    quiz: [
      {
        type: "OX",
        question: "단 하나의 특정 가상 EC2 서버 인스턴스 사양 스펙을 최고 수준으로 상향(Scale-up) 세팅하는 것만으로 완전한 고가용성(HA) 구조 표준이 성립된다.",
        answer: "X",
        explanation: "단일 하드웨어 컴퓨터 기반 구조는 스펙이 아무리 비싸도 해당 장비 메인보드 하나가 다운되면 대안이 없는 단일 장애점(SPOF) 리스크를 그대로 노출하므로 HA 구조에 위배됨"
      },
      {
        type: "MULTIPLE_CHOICE",
        question: "안정적인 프로덕션 클라우드 인프라 토대를 설계할 때 고가용성(HA) 지표를 충족하기 위해 최우선적으로 준수해야 하는 엔지니어링 설계 대원칙은?",
        options: ["단일 장애점(SPOF) 제거 및 인프라 자원의 다중화·분산 배치", "VPC 내부 모든 디스크 스토리지를 최고가 유형의 단일 가상 볼륨 장치로 일원화", "네트워크 방화벽 보안 허용 검사 통로 규칙을 전부 오픈하여 전송 처리 마찰 최소화 유도", "모든 컴퓨팅 연산 데이터 처리를 오직 단 하나의 단일 가용 영역(AZ) 중앙 시설에 강제 집중 배치"],
        answer: "단일 장애점(SPOF) 제거 및 인프라 자원의 다중화·분산 배치",
        explanation: "특정 지점의 파괴가 전체 시스템 중단으로 연쇄 오염되는 연결 고리를 끊어내고 다중 AZ 물리 환경 분할 및 복제 인프라 백업 환경을 구축하는 것이 HA 아키텍처의 핵심임"
      }
    ]
  }
];