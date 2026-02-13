// ============================================================
// Finance Notes - Operations
// ============================================================

// --- localStorage migration (old gs-ops-* → fin-ops-*) ---
(function migrateStorage() {
    if (localStorage.getItem('fin-ops-migrated')) return;
    const map = { 'gs-ops-lang': 'fin-ops-lang', 'gs-ops-v1': 'fin-ops-v1' };
    Object.entries(map).forEach(([oldK, newK]) => {
        const v = localStorage.getItem(oldK);
        if (v !== null && localStorage.getItem(newK) === null) {
            localStorage.setItem(newK, v);
        }
    });
    localStorage.setItem('fin-ops-migrated', '1');
})();

// --- i18n ---
let currentLang = localStorage.getItem('fin-ops-lang') || 'ja';
const i18n = {
    en: {
        dashboard:'Dashboard', financeBasics:'Finance Basics', tradeLifecycle:'Trade Lifecycle', marketKnowledge:'Markets',
        behavioral:'Behavioral', technical:'Technical Q&A', caseStudy:'Case Study',
        glossary:'Glossary', references:'References',
        referencesDesc:'Useful resources for deeper study. Covers trade lifecycle, settlement, regulations, and industry knowledge.',
        subtitle:'Operations', description:'Operations knowledge base and reference guide',
        showAnswer:'Show Answer',
        starMethod:'STAR Method',
        starDesc:'<b>S</b>ituation: Set the context<br><b>T</b>ask: Describe your responsibility<br><b>A</b>ction: Explain what you did (focus here)<br><b>R</b>esult: Share the outcome with metrics if possible',
        financeBasicsTitle:'Finance Basics',
        financeBasicsDesc:'Background knowledge to help you understand the role. You do NOT need to memorize this, a big-picture understanding is enough for interviews.',
        tradeLifecycleTitle:'Trade Lifecycle Knowledge',
        tradeLifecycleDesc:'Understand each step from order to settlement',
        marketTitle:'Financial Markets & Products',
        marketDesc:'Reference material for understanding the industry. In interviews, showing you grasp the big picture is more valuable than knowing every detail.',
        behavioralTitle:'Behavioral Interview',
        behavioralDesc:'Prepare STAR answers for Operations-focused questions',
        technicalTitle:'Technical Q&A',
        technicalDesc:'About 20-30% of the interview may touch on these topics. You do not need textbook-perfect answers. Explain concepts in your own words and show you understand WHY they matter.',
        caseTitle:'Case Studies',
        caseDesc:'Practice real-world Operations problem-solving scenarios',
        glossaryTitle:'Glossary',
        glossaryDesc:'Key financial and Operations terms',
        recentTopicsTitle:'Recent Industry Topics',
        recentTopicsDesc:'Knowing current trends shows you follow the industry',
    },
    ja: {
        dashboard:'ダッシュボード', financeBasics:'金融基礎', tradeLifecycle:'トレードライフサイクル', marketKnowledge:'金融市場',
        behavioral:'行動面接', technical:'テクニカルQ&A', caseStudy:'ケーススタディ',
        glossary:'用語集', references:'参考リンク',
        referencesDesc:'より深い学習のための参考資料です。トレードライフサイクル、決済、規制、業界知識をカバーしています。',
        subtitle:'オペレーション', description:'オペレーション知識ベース・リファレンスガイド',
        showAnswer:'答えを見る',
        starMethod:'STARメソッド',
        starDesc:'<b>S</b>ituation（状況）: 背景を説明<br><b>T</b>ask（課題）: あなたの責任を述べる<br><b>A</b>ction（行動）: 何をしたか説明（ここが重点）<br><b>R</b>esult（結果）: 成果を数値とともに共有',
        financeBasicsTitle:'金融基礎',
        financeBasicsDesc:'役割を理解するための背景知識です。暗記する必要はありません, 面接では大枠がわかっていれば十分です。',
        tradeLifecycleTitle:'トレードライフサイクル知識',
        tradeLifecycleDesc:'注文から決済までの各ステップを理解する',
        marketTitle:'金融市場と商品',
        marketDesc:'業界を理解するための参考資料です。面接では細かい知識より「全体像を掴んでいること」が評価されます。',
        behavioralTitle:'行動面接',
        behavioralDesc:'オペレーション向けのSTAR形式回答を準備',
        technicalTitle:'テクニカルQ&A',
        technicalDesc:'面接の2-3割がこれらのトピックに触れる可能性があります。教科書的な完璧な回答は不要です。自分の言葉で概念を説明し、なぜ重要かを理解していることを示しましょう。',
        caseTitle:'ケーススタディ',
        caseDesc:'実際のオペレーション問題解決シナリオを練習',
        glossaryTitle:'用語集',
        glossaryDesc:'重要な金融・オペレーション用語',
        recentTopicsTitle:'最近の業界トピック',
        recentTopicsDesc:'最新のトレンドを知っていると業界への関心を示せます',
    }
};
function t(k){ return i18n[currentLang][k] || i18n.en[k] || k; }
function L(obj, f){ return currentLang === 'ja' && obj[f + 'Ja'] ? obj[f + 'Ja'] : obj[f]; }

// --- Storage (language only) ---


// ============================================================
// DATA
// ============================================================

// --- Finance Basics (beginner-only educational content) ---
const financeBasicsTopics = [
    { id:'fb1', title:'What is an Investment Bank?', titleJa:'投資銀行とは？',
      content:'An investment bank helps companies and governments raise money by issuing stocks and bonds, advises on mergers and acquisitions, and trades financial products. Think of it like a specialized financial advisor that works with very large transactions. Major divisions typically include: Investment Banking (advisory & underwriting), Markets/Trading (buying & selling securities), Asset Management (managing money for clients), and Operations (the engine room that makes everything work).',
      contentJa:'投資銀行は、企業や政府が株式や債券を発行して資金を調達するのを助け、M&A（合併・買収）のアドバイスを行い、金融商品を売買します。非常に大きな取引を扱う専門的な金融アドバイザーのようなものです。主な部門：投資銀行部門（アドバイザリー＆引受）、マーケット/トレーディング（証券の売買）、アセットマネジメント（顧客の資産運用）、オペレーション（すべてを動かすエンジンルーム）。',
      keyPoints:['Helps companies raise capital (IPOs, bond issuances)','Advises on M&A deals','Trades securities for clients and the firm','Operations is the critical infrastructure that supports all activities'],
      keyPointsJa:['企業の資金調達を支援（IPO、債券発行）','M&A取引のアドバイス','顧客と自社のために証券を売買','オペレーションは全活動を支える重要インフラ'] },
    { id:'fb2', title:'What Does Operations Do?', titleJa:'オペレーション部門とは？',
      content:'Operations is often called the "central nervous system" of a bank. When a trader buys or sells a stock, the trade doesn\'t just happen magically, someone needs to make sure the money and securities actually move between the right accounts, that all the records match, and that regulations are followed. That\'s Operations. It\'s like the logistics department of an online store: the customer clicks "buy," but Ops handles packaging, shipping, tracking, and making sure the right item reaches the right person.',
      contentJa:'オペレーション部門は銀行の「中枢神経」と呼ばれます。トレーダーが株を売買しても、魔法のように完了するわけではありません。実際にお金と証券が正しい口座間で移動し、全ての記録が一致し、規制が守られていることを確認する人が必要です。それがオペレーションです。ネット通販の物流部門のようなもの：お客さんが「購入」をクリックした後、梱包・発送・追跡を行い、正しい商品が正しい人に届くようにするのがOpsの仕事です。',
      keyPoints:['Ensures trades are settled correctly (money and securities move properly)','Reconciles records to catch errors','Manages risk and ensures regulatory compliance','Drives process automation and efficiency'],
      keyPointsJa:['取引が正しく決済されることを保証（お金と証券が適切に移動）','記録を照合してエラーを検出','リスク管理と規制遵守を確保','プロセスの自動化と効率化を推進'] },
    { id:'fb7', title:'What is a Market?', titleJa:'市場（マーケット）とは？',
      content:'A market is a place (physical or electronic) where buyers and sellers come together to trade. The primary market is where new securities are born: when a company first sells its stock to the public (IPO), that happens in the primary market. After that, people buy and sell those stocks among themselves on the secondary market (like the NYSE or Tokyo Stock Exchange). Think of it like this: the primary market is the factory selling a new product for the first time, and the secondary market is the used-goods marketplace where people resell to each other.',
      contentJa:'市場とは、売り手と買い手が集まって取引する場所（実際の建物でも電子的な場でも）です。発行市場（プライマリー）は新しい証券が生まれる場所: 企業が初めて株式を一般に売り出す（IPO）時は発行市場で行われます。その後、人々がその株式を互いに売買するのが流通市場（セカンダリー、NYSEや東京証券取引所など）です。例えるなら：発行市場は工場が新製品を初めて売る場所、流通市場は人々が互いに売買する中古品マーケットです。',
      keyPoints:['Primary market: where new securities are issued (IPOs)','Secondary market: where existing securities are traded','Exchanges (NYSE, TSE) provide an organized marketplace','OTC (Over-the-Counter): trades done directly between parties, not on an exchange'],
      keyPointsJa:['発行市場：新しい証券が発行される場所（IPO）','流通市場：既存の証券が取引される場所','取引所（NYSE、東証）は組織化された市場を提供','OTC（店頭取引）：取引所を介さず当事者間で直接行う取引'] },
    { id:'fb3', title:'Key Participants in a Trade', titleJa:'取引の主要参加者',
      content:'A trade involves many parties working together: the Buyer and Seller (the two sides of the trade), the Broker/Dealer (intermediary that executes trades), the Exchange (marketplace like NYSE where trades happen, think of it as an auction house), the CCP (Central Counterparty, stands between buyer and seller to guarantee the trade completes even if one side fails), the Custodian (holds securities safely, like a safe deposit box for stocks), and the Regulator (government body ensuring fair and orderly markets).',
      contentJa:'取引には多くの関係者が協力します：買い手と売り手（取引の両当事者）、ブローカー/ディーラー（取引を執行する仲介者）、取引所（NYSEのような市場, オークション会場のようなもの）、CCP（中央清算機関, 買い手と売り手の間に入り、片方が失敗しても取引完了を保証）、カストディアン（証券を安全に保管, 株式の貸金庫のようなもの）、規制当局（公正で秩序ある市場を確保する政府機関）。',
      keyPoints:['Buyer & Seller, the two sides of every trade','Broker/Dealer, executes trades on behalf of clients','Exchange, the marketplace where orders are matched','CCP, guarantees trade completion, reducing counterparty risk','Custodian, safekeeps securities','Regulator, oversees market fairness'],
      keyPointsJa:['買い手と売り手, 全取引の両当事者','ブローカー/ディーラー, 顧客に代わって取引を執行','取引所, 注文がマッチングされる市場','CCP, 取引完了を保証し、カウンターパーティリスクを削減','カストディアン, 証券を安全に保管','規制当局, 市場の公正性を監視'] },
    { id:'fb4', title:'Types of Securities', titleJa:'証券の種類',
      content:'Securities are tradeable financial assets. The main types are: Stocks/Equities (owning a piece of a company, like being a co-owner of a shop), Bonds/Fixed Income (lending money to a company or government in exchange for regular interest payments, like an IOU with interest), Derivatives (contracts whose value depends on something else, like betting on whether it will rain without owning the weather, futures, options, swaps), and FX/Currencies (exchanging one currency for another, essential for international trade).',
      contentJa:'証券は取引可能な金融資産です。主な種類：株式（会社の一部を所有すること, お店の共同オーナーになるようなもの）、債券（会社や政府にお金を貸して定期的に利息を受け取る, 利息付きの借用書のようなもの）、デリバティブ（別の何かに価値が連動する契約。天気を所有せずに雨が降るかどうかに賭けるようなもの, 先物、オプション、スワップ）、外国為替（ある通貨を別の通貨に交換。国際取引に不可欠）。',
      keyPoints:['Equities = ownership in a company','Bonds = lending money for interest','Derivatives = contracts based on underlying assets','FX = currency exchange'],
      keyPointsJa:['株式 = 会社の所有権','債券 = 利息のためにお金を貸す','デリバティブ = 原資産に基づく契約','外国為替 = 通貨の交換'] },
    { id:'fb8', title:'Market Indices and Benchmarks', titleJa:'株価指数とベンチマーク',
      content:'A market index tracks the performance of a group of stocks to show how the overall market is doing. Think of it as a thermometer for the economy. The Nikkei 225 tracks 225 major Japanese companies. The S&P 500 tracks 500 large US companies. The Dow Jones Industrial Average tracks 30 major US companies. When news says "the market went up today," they usually mean one of these indices rose. Knowing these helps you understand financial news and shows interviewers you follow the markets.',
      contentJa:'株価指数は、一群の株式のパフォーマンスを追跡し、市場全体の動向を示します。経済の体温計のようなものです。日経225は日本の主要225社を追跡。S&P 500は米国の大企業500社。ダウ平均は米国主要30社。ニュースで「今日は市場が上がった」と言えば、通常これらの指数が上昇したことを意味します。これらを知っていると金融ニュースが理解でき、面接官に市場への関心を示せます。',
      keyPoints:['Nikkei 225: tracks 225 major Japanese companies','S&P 500: tracks 500 large US companies, widely used benchmark','Dow Jones: tracks 30 major US companies','Indices help you quickly understand overall market direction'],
      keyPointsJa:['日経225：日本の主要225社を追跡','S&P 500：米国の大企業500社を追跡、広く使われるベンチマーク','ダウ平均：米国の主要30社を追跡','指数は市場全体の方向を素早く把握するのに役立つ'] },
    { id:'fb5', title:'How Settlement Works', titleJa:'決済の仕組み',
      content:'Settlement is the actual exchange of money and securities after a trade. Think of online shopping: clicking "buy" is like executing a trade, but the actual exchange of goods and money happens later, that\'s settlement. In financial markets, this typically happens T+1 (one business day after the trade) for US stocks or T+2 for many other markets. "DvP" (Delivery vs Payment) ensures both sides deliver simultaneously, so neither side gets cheated.',
      contentJa:'決済とは、取引後にお金と証券を実際に交換することです。ネット通販で例えると：「購入」をクリックするのが取引の執行、実際に商品とお金がやり取りされるのが決済です。金融市場では通常、米国株はT+1（取引翌営業日）、他の多くの市場ではT+2で決済されます。「DvP」（Delivery vs Payment）は両者が同時に引き渡すことを保証し、どちらも騙されないようにします。',
      keyPoints:['Settlement = actual exchange of money and securities','T+1 means one business day after the trade','DvP ensures simultaneous delivery to protect both parties','Settlement fails require investigation and resolution'],
      keyPointsJa:['決済 = お金と証券の実際の交換','T+1は取引の翌営業日','DvPは両者の同時引き渡しを保証','決済失敗は調査と解決が必要'] },
    { id:'fb6', title:'What is Risk?', titleJa:'リスクとは？',
      content:'In finance, risk means the chance that something goes wrong. Operational Risk is the risk of losses from failed processes, human errors, or system failures, like accidentally sending money to the wrong account or a computer system crashing during trading hours. Other types include Market Risk (prices move against you), Credit Risk (someone can\'t pay you back), and Liquidity Risk (you can\'t sell something fast enough). Operations focuses primarily on managing and reducing operational risk.',
      contentJa:'金融におけるリスクとは、何かがうまくいかない可能性です。オペレーショナルリスクは、プロセスの失敗、人的ミス、システム障害による損失のリスク, 例えば間違った口座にお金を送ってしまったり、取引時間中にコンピュータシステムがダウンしたりすること。他の種類：マーケットリスク（価格が不利に動く）、信用リスク（相手がお金を返せない）、流動性リスク（十分な速さで売れない）。オペレーション部門は主にオペレーショナルリスクの管理と削減に注力します。',
      keyPoints:['Operational Risk: process failures, human errors, system crashes','Market Risk: prices moving against your position','Credit Risk: counterparty unable to pay','Operations works to minimize operational risk through controls and automation'],
      keyPointsJa:['オペレーショナルリスク：プロセスの失敗、人的ミス、システム障害','マーケットリスク：ポジションに不利な価格変動','信用リスク：カウンターパーティが支払い不能','オペレーションはコントロールと自動化でオペレーショナルリスクを最小化'] },
];

// --- Trade Lifecycle ---
const tradeLifecycleSteps = [
    { id:'tl1', title:'Pre-Trade', titleJa:'プレトレード',
      content:'Client onboarding, KYC/AML checks, account setup, credit limit verification, product suitability assessment. Operations ensures all prerequisites are met before trading begins.',
      contentJa:'クライアントのオンボーディング、KYC/AML確認、口座開設、与信枠確認、商品適合性評価。取引開始前に全ての前提条件が整っていることをオペレーションが確認する。',
      opsRole:'Verify client documentation, set up static data, configure settlement instructions.',
      opsRoleJa:'クライアント書類の確認、スタティックデータ設定、決済指示の設定。',
      beginnerNote:'Think of this like a background check before someone can open a bank account. The bank needs to verify who you are (KYC) and make sure you\'re not involved in illegal activities (AML).',
      beginnerNoteJa:'銀行口座を開設する前の身元確認のようなものです。銀行はあなたが誰かを確認し（KYC）、違法行為に関わっていないことを確認する（AML）必要があります。' },
    { id:'tl2', title:'Trade Execution', titleJa:'取引執行',
      content:'Order placement → order routing → matching/execution on exchange or OTC. Trade capture in booking systems. Confirmation generation.',
      contentJa:'注文発注 → ルーティング → 取引所またはOTCでのマッチング/約定。ブッキングシステムへの取引記録。コンファメーション生成。',
      opsRole:'Ensure accurate trade capture, validate trade economics, send/receive confirmations.',
      opsRoleJa:'正確な取引記録の確保、取引条件の検証、コンファメーションの送受信。',
      beginnerNote:'This is like placing an order on an online store. You pick what you want (order), the system finds a seller (matching), and you get an order confirmation email (confirmation).',
      beginnerNoteJa:'ネット通販で注文するようなものです。欲しいものを選び（注文）、システムが売り手を見つけ（マッチング）、注文確認メールが届きます（コンファメーション）。' },
    { id:'tl3', title:'Clearing', titleJa:'クリアリング（清算）',
      content:'Applies to CCP-cleared products (exchange-traded derivatives, mandated OTC products). CCP steps in as buyer to seller and seller to buyer. Margin calculation (initial + variation). Netting of obligations to reduce settlement risk. Non-cleared trades (bilateral OTC) follow a separate confirmation and collateral exchange process.',
      contentJa:'CCP清算対象商品（取引所デリバティブ、義務化されたOTC商品）に適用。CCPが売り手と買い手の間に入る。証拠金計算（当初+変動）。決済リスク削減のための債務ネッティング。非清算取引（二者間OTC）は別途のコンファメーション・担保交換プロセスに従う。',
      opsRole:'Monitor margin calls, ensure timely margin payments, reconcile CCP positions. For bilateral trades: manage collateral agreements (CSA) and confirmation matching.',
      opsRoleJa:'マージンコールの監視、証拠金の適時支払い、CCPポジションの照合。二者間取引の場合：担保契約（CSA）管理とコンファメーションマッチング。',
      beginnerNote:'The CCP is a trusted middleman standing between two traders. If one can\'t pay, the CCP covers it using collected deposits. "Netting" means if you owe me $100 and I owe you $80, we just settle the $20 difference, much more efficient.',
      beginnerNoteJa:'CCP\u306f\u4e8c\u4eba\u306e\u30c8\u30ec\u30fc\u30c0\u30fc\u306e\u9593\u306b\u7acb\u3064\u4fe1\u983c\u3067\u304d\u308b\u4ef2\u4ecb\u8005\u3067\u3059\u3002\u4e00\u65b9\u304c\u652f\u6255\u3048\u306a\u304f\u306a\u3063\u3066\u3082\u3001CCP\u304c\u9810\u304b\u3063\u305f\u4fdd\u8a3c\u91d1\u3067\u30ab\u30d0\u30fc\u3057\u307e\u3059\u3002\u300c\u30cd\u30c3\u30c6\u30a3\u30f3\u30b0\u300d\u3068\u306f\u3001\u3042\u306a\u305f\u304c\u79c1\u306b100\u30c9\u30eb\u3001\u79c1\u304c\u3042\u306a\u305f\u306b80\u30c9\u30eb\u501f\u308a\u3066\u3044\u308b\u5834\u5408\u300120\u30c9\u30eb\u306e\u5dee\u984d\u3060\u3051\u6c7a\u6e08\u3059\u308b\u3053\u3068, \u306f\u308b\u304b\u306b\u52b9\u7387\u7684\u3067\u3059\u3002' },
    { id:'tl4', title:'Settlement', titleJa:'決済',
      content:'Delivery vs Payment (DvP): securities delivered against payment. Settlement cycles vary by asset class and market: T+1 (US equities/ETFs since May 2024), T+2 (EU/Asia equities, corporate bonds), T+0 to T+2 (government bonds varies by market), T+2 (FX spot). Failed trades require investigation and resolution.',
      contentJa:'DvP（Delivery vs Payment）：代金と引き換えに証券を引き渡す。決済サイクルは資産クラスと市場により異なる：T+1（2024年5月以降の米国株式/ETF）、T+2（欧州/アジア株式、社債）、T+0～T+2（国債は市場により異なる）、T+2（FXスポット）。決済失敗は調査と解決が必要。',
      opsRole:'Monitor settlement status, investigate fails, manage breaks, liaise with custodians and counterparties.',
      opsRoleJa:'決済状況の監視、失敗の調査、ブレークの管理、カストディアンやカウンターパーティとの連絡。',
      beginnerNote:'Settlement is like the final step of online shopping, when the product is actually delivered and your payment is processed. DvP ensures this happens simultaneously so neither side gets cheated. "T+1" means this happens the next business day after the trade.',
      beginnerNoteJa:'決済はネット通販の最終ステップのようなもの, 商品が実際に届き、支払いが処理される時です。DvPはこれが同時に行われることを保証します。「T+1」は取引の翌営業日に行われることを意味します。' },
    { id:'tl5', title:'Post-Trade / Reporting', titleJa:'ポストトレード / レポーティング',
      content:'Reconciliation (internal books vs external records). Corporate actions processing. Regulatory reporting (trade reporting vs transaction reporting, distinct obligations). Note: P&L verification is primarily Product Control/Finance responsibility, but Ops supports by ensuring accurate position and trade data feeds.',
      contentJa:'照合（内部帳簿と外部記録の突合）。コーポレートアクション処理。規制報告（トレードレポーティングとトランザクションレポーティングは別の義務）。注意：損益検証は主にプロダクトコントロール/ファイナンスの責任だが、Opsは正確なポジション・取引データの提供で支援する。',
      opsRole:'Daily reconciliation, break resolution, regulatory filings, exception management, ensuring data quality for downstream reporting.',
      opsRoleJa:'日次照合、ブレーク解決、規制当局への報告、例外管理、下流のレポーティングに向けたデータ品質の確保。',
      beginnerNote:'Reconciliation is like checking your bank statement against your receipts, making sure everything matches up. If there\'s a discrepancy (a "break"), Ops investigates and fixes it.',
      beginnerNoteJa:'照合は銀行の明細とレシートを照らし合わせるようなもの, 全てが一致しているか確認します。不一致（「ブレーク」）があれば、Opsが調査して修正します。' },
    { id:'tl6', title:'Risk & Control (Cross-cutting)', titleJa:'リスク＆コントロール（横断的枠組み）',
      content:'Not a sequential step but a cross-cutting framework that spans the entire lifecycle. Includes: operational risk identification (RCSA), Key Risk Indicators (KRI) monitoring, control design and testing, incident escalation and management, root cause analysis, process improvement and automation initiatives.',
      contentJa:'順序的なステップではなく、ライフサイクル全体を横断する枠組み。含む：オペレーショナルリスクの特定（RCSA）、主要リスク指標（KRI）の監視、コントロールの設計とテスト、インシデントのエスカレーションと管理、根本原因分析、プロセス改善と自動化の推進。',
      opsRole:'Design and operate controls at each lifecycle stage, monitor KRIs, escalate incidents, drive automation to reduce manual risk. Conduct RCSA assessments and manage operational risk events.',
      opsRoleJa:'各ライフサイクルステージでのコントロール設計と運用、KRIの監視、インシデントのエスカレーション、手作業リスク削減のための自動化推進。RCSAアセスメントの実施とオペレーショナルリスク事象の管理。',
      beginnerNote:'This isn\'t a step that happens after everything else, it\'s like a quality control team that monitors every step of a factory production line, looking for problems and finding ways to improve.',
      beginnerNoteJa:'これは他の全ての後に起こるステップではありません, 工場の生産ラインの各段階を監視し、問題を探し、改善方法を見つける品質管理チームのようなものです。' },
];

// --- Market Knowledge ---
const marketTopics = [
    { id:'mk1', title:'Equities', titleJa:'株式',
      content:'Equities = ownership in a company. Key products: Common stock (voting rights + dividends), Preferred stock (fixed dividends, no voting), ETFs (Exchange-Traded Funds, baskets of stocks traded like a single share), ADRs/GDRs (foreign stocks listed on domestic exchanges).\n\nTrading venues: NYSE, NASDAQ (US), London Stock Exchange (UK), Tokyo Stock Exchange (Japan). Orders are matched by price-time priority.\n\nSettlement: T+1 in the US (since May 2024), T+2 in EU/Asia. CSD holds shares electronically, nobody has paper certificates anymore.\n\nOps relevance: trade confirmation, settlement instruction (SSI) management, corporate action processing (dividends, splits), fail management. Equities are the highest-volume asset class, automation and STP rates are critical.',
      contentJa:'株式 = 会社の所有権。主な商品：普通株（議決権＋配当）、優先株（固定配当、議決権なし）、ETF（上場投資信託, 複数の株式をまとめて1つの株のように取引）、ADR/GDR（海外株を国内取引所で上場したもの）。\n\n取引所：NYSE、NASDAQ（米国）、ロンドン証券取引所（英国）、東京証券取引所（日本）。注文は価格-時間優先でマッチング。\n\n決済：米国はT+1（2024年5月〜）、欧州/アジアはT+2。CSDが電子的に株式を保管, もう紙の証券はありません。\n\nOpsの関わり：取引確認、決済指図（SSI）管理、コーポレートアクション処理（配当、分割）、フェイル管理。株式は最も取引量の多い資産クラス, 自動化とSTP率が非常に重要。',
      beginnerNote:'Stocks represent ownership in a company. If you buy 1 share of a company with 100 shares total, you own 1%. ETFs are like pre-made baskets, instead of picking individual stocks, you buy one fund that contains many. This is the market most people think of when they hear "finance."',
      beginnerNoteJa:'株式は会社の所有権です。全100株の会社で1株買えば、1%のオーナーです。ETFは詰め合わせパックのようなもの, 個別株を選ぶ代わりに、多くの株を含む1つのファンドを買えます。「金融」と聞いて多くの人が最初にイメージする市場です。' },
    { id:'mk2', title:'Fixed Income', titleJa:'債券',
      content:'Fixed Income = debt instruments. The issuer borrows money and pays it back with interest.\n\nKey products: Government bonds (US Treasuries, JGBs, Gilts, considered "risk-free"), Corporate bonds (issued by companies, higher yield = higher risk), Municipal bonds (US local governments), Money market instruments (T-bills, commercial paper, short-term).\n\nKey concepts: Coupon (periodic interest payment), Yield (effective return considering price), Maturity (when principal is repaid), Credit rating (Moody\'s/S&P/Fitch assess default risk, AAA is safest, below BBB- is "junk").\n\nSettlement: Government bonds typically T+1, corporate T+2. Often settled via Fedwire (US govt), Euroclear/Clearstream (EU).\n\nOps relevance: coupon and redemption processing, bond pricing (clean vs dirty price), interest accrual calculations, credit event monitoring. More complex than equities because of varied settlement conventions by product type.',
      contentJa:'債券 = 借入証券。発行者がお金を借りて利息をつけて返す。\n\n主な商品：国債（米国債、JGB、ギルト,「リスクフリー」とされる）、社債（企業が発行、高利回り＝高リスク）、地方債（米国の地方自治体）、短期金融商品（T-bills、コマーシャルペーパー, 短期）。\n\n重要概念：クーポン（定期的な利息支払い）、利回り（価格を考慮した実効リターン）、満期（元本が返済される時）、信用格付け（Moody\'s/S&P/Fitchがデフォルトリスクを評価, AAAが最も安全、BBB-未満は「ジャンク」）。\n\n決済：国債は通常T+1、社債はT+2。Fedwire（米国国債）、Euroclear/Clearstream（EU）で決済されることが多い。\n\nOpsの関わり：クーポン・償還処理、債券の価格計算（クリーン価格 vs ダーティ価格）、経過利息計算、信用イベントのモニタリング。商品タイプごとに決済慣行が異なるため、株式より複雑。',
      beginnerNote:'Bonds are like IOUs, you lend money to a government or company, they pay you interest regularly, and return the principal at maturity. Government bonds are considered very safe. Corporate bonds pay more interest but carry more risk. Credit ratings (AAA to D) tell you how safe a bond is.',
      beginnerNoteJa:'債券は借用書のようなもの, 政府や企業にお金を貸し、定期的に利息をもらい、満期に元本が返ってきます。国債は非常に安全とされ、社債はより多くの利息を払うがリスクも大きい。信用格付け（AAAからD）で安全度がわかります。' },
    { id:'mk3', title:'FX (Foreign Exchange)', titleJa:'外国為替 (FX)',
      content:'FX = exchanging one currency for another. The world\'s largest market by volume ($7.5 trillion/day).\n\nKey products: Spot (exchange now, settle T+2), Forwards (agree on future exchange rate), Swaps (exchange currencies now and reverse later, most common FX instrument by volume), Options (right but not obligation to exchange at a set rate).\n\nMajor pairs: EUR/USD (most traded), USD/JPY, GBP/USD, USD/CHF. "Base/Quote" convention, EUR/USD = 1.10 means 1 EUR costs 1.10 USD.\n\nSettlement: CLS (Continuous Linked Settlement) handles PvP (Payment versus Payment) for 18 currencies. PvP eliminates Herstatt risk, the risk that one side pays but the other doesn\'t (named after a German bank that failed in 1974).\n\nOps relevance: settlement instruction matching, CLS submission deadlines, nostro account reconciliation, managing value date mismatches. FX Ops is very time-zone sensitive, trades between Tokyo and New York settle across different business hours.',
      contentJa:'FX = 通貨の交換。取引量で世界最大の市場（1日$7.5兆）。\n\n主な商品：スポット（今交換、T+2で決済）、フォワード（将来の為替レートを合意）、スワップ（今通貨を交換し後で戻す, 取引量で最も多いFX商品）、オプション（設定レートで交換する権利だが義務はない）。\n\n主要通貨ペア：EUR/USD（最も取引量が多い）、USD/JPY、GBP/USD、USD/CHF。「ベース/クォート」の慣習, EUR/USD=1.10は1ユーロ=1.10ドルの意味。\n\n決済：CLS（Continuous Linked Settlement）が18通貨のPvP（Payment versus Payment）を処理。PvPはヘルシュタットリスクを排除, 一方が支払ったのに他方が支払わないリスク（1974年に破綻したドイツの銀行に由来）。\n\nOpsの関わり：決済指図のマッチング、CLS提出期限、ノストロ口座の照合、バリューデートの不一致管理。FX Opsは非常にタイムゾーンに敏感, 東京とニューヨーク間の取引は異なる営業時間にまたがって決済される。',
      beginnerNote:'FX is exchanging one currency for another, like exchanging yen for dollars at the airport, but on a massive scale ($7.5 trillion daily). The biggest risk in FX is that one side pays but the other doesn\'t (called Herstatt risk). CLS was created to solve this by making both sides pay simultaneously.',
      beginnerNoteJa:'FXはある通貨を別の通貨に交換すること, 空港で円をドルに両替するのと同じですが、桁違いの規模（1日$7.5兆）です。FX最大のリスクは一方が支払ったのに他方が支払わないこと（ヘルシュタットリスク）。CLSは両者を同時に決済させることでこの問題を解決するために作られました。' },
    { id:'mk4', title:'Derivatives', titleJa:'デリバティブ',
      content:'Derivatives = contracts whose value derives from an underlying asset (stocks, bonds, rates, FX, commodities).\n\nKey products:\n• Futures, obligation to buy/sell at a set price on a set date. Exchange-traded, standardized, margined daily.\n• Options, right (not obligation) to buy (call) or sell (put) at a set price. Premium paid upfront.\n• Swaps, exchange of cash flows. IRS (Interest Rate Swap, fixed vs floating rate), CDS (Credit Default Swap, insurance against default).\n\nExchange-traded vs OTC: Exchange-traded derivatives are standardized and cleared through CCPs. OTC derivatives are customized between two parties and governed by ISDA Master Agreements.\n\nPost-2008 reforms: Dodd-Frank/EMIR mandated central clearing for standardized OTC derivatives and trade reporting to repositories. This is why CCPs are so important.\n\n\nSettlement: Exchange-traded derivatives settle through the CCP (daily margin settlement). OTC cleared derivatives settle via CCP with IM/VM. Bilateral OTC settles per CSA terms. Futures typically cash-settled; options may be cash or physical delivery.\n\nOps relevance: margin management (initial + variation), daily P&L marking, trade lifecycle events (novation, compression, exercise/expiry), ISDA documentation, regulatory reporting to trade repositories.',
      contentJa:'\u30c7\u30ea\u30d0\u30c6\u30a3\u30d6 = \u539f\u8cc7\u7523\uff08\u682a\u5f0f\u3001\u50b5\u5238\u3001\u91d1\u5229\u3001FX\u3001\u30b3\u30e2\u30c7\u30a3\u30c6\u30a3\uff09\u304b\u3089\u4fa1\u5024\u304c\u6d3e\u751f\u3059\u308b\u5951\u7d04\u3002\n\n\u4e3b\u306a\u5546\u54c1\uff1a\n\u2022 \u5148\u7269, \u8a2d\u5b9a\u4fa1\u683c\u3067\u8a2d\u5b9a\u65e5\u306b\u58f2\u8cb7\u3059\u308b\u7fa9\u52d9\u3002\u53d6\u5f15\u6240\u3067\u53d6\u5f15\u3001\u6a19\u6e96\u5316\u3001\u65e5\u6b21\u3067\u8a3c\u62e0\u91d1\u8abf\u6574\u3002\n\u2022 \u30aa\u30d7\u30b7\u30e7\u30f3, \u8a2d\u5b9a\u4fa1\u683c\u3067\u8cb7\u3046\uff08\u30b3\u30fc\u30eb\uff09/\u58f2\u308b\uff08\u30d7\u30c3\u30c8\uff09\u6a29\u5229\uff08\u7fa9\u52d9\u3067\u306f\u306a\u3044\uff09\u3002\u30d7\u30ec\u30df\u30a2\u30e0\u3092\u524d\u6255\u3044\u3002\n\u2022 \u30b9\u30ef\u30c3\u30d7, \u30ad\u30e3\u30c3\u30b7\u30e5\u30d5\u30ed\u30fc\u306e\u4ea4\u63db\u3002IRS\uff08\u91d1\u5229\u30b9\u30ef\u30c3\u30d7, \u56fa\u5b9a\u91d1\u5229vs\u5909\u52d5\u91d1\u5229\uff09\u3001CDS\uff08\u30af\u30ec\u30b8\u30c3\u30c8\u30fb\u30c7\u30d5\u30a9\u30eb\u30c8\u30fb\u30b9\u30ef\u30c3\u30d7, \u30c7\u30d5\u30a9\u30eb\u30c8\u306b\u5bfe\u3059\u308b\u4fdd\u967a\uff09\u3002\n\n\u53d6\u5f15\u6240\u53d6\u5f15 vs OTC\uff1a\u53d6\u5f15\u6240\u30c7\u30ea\u30d0\u30c6\u30a3\u30d6\u306f\u6a19\u6e96\u5316\u3055\u308cCCP\u3067\u6e05\u7b97\u3002OTC\u30c7\u30ea\u30d0\u30c6\u30a3\u30d6\u306f\u4e8c\u8005\u9593\u3067\u30ab\u30b9\u30bf\u30de\u30a4\u30ba\u3055\u308c\u3001ISDA\u30de\u30b9\u30bf\u30fc\u5951\u7d04\u3067\u898f\u5b9a\u3002\n\n2008\u5e74\u4ee5\u964d\u306e\u6539\u9769\uff1a\u30c9\u30c3\u30c9\u30fb\u30d5\u30e9\u30f3\u30af\u6cd5/EMIR\u306b\u3088\u308a\u6a19\u6e96\u5316OTC\u30c7\u30ea\u30d0\u30c6\u30a3\u30d6\u306e\u4e2d\u592e\u6e05\u7b97\u3068\u30c8\u30ec\u30fc\u30c9\u30ea\u30dd\u30b8\u30c8\u30ea\u3078\u306e\u5831\u544a\u304c\u7fa9\u52d9\u5316\u3002\u3060\u304b\u3089CCP\u304c\u975e\u5e38\u306b\u91cd\u8981\u3002\n\n\u6c7a\u6e08\uff1a\u53d6\u5f15\u6240\u30c7\u30ea\u30d0\u30c6\u30a3\u30d6\u306fCCP\u3092\u901a\u3058\u3066\u6c7a\u6e08\uff08\u65e5\u6b21\u8a3c\u62e0\u91d1\u6c7a\u6e08\uff09\u3002OTC\u6e05\u7b97\u30c7\u30ea\u30d0\u30c6\u30a3\u30d6\u306fCCP\u7d4cIM/VM\u3067\u6c7a\u6e08\u3002\u4e8c\u8005\u9593OTC\u306fCSA\u6761\u4ef6\u3067\u6c7a\u6e08\u3002\u5148\u7269\u306f\u901a\u5e38\u73fe\u91d1\u6c7a\u6e08\u3001\u30aa\u30d7\u30b7\u30e7\u30f3\u306f\u73fe\u91d1\u307e\u305f\u306f\u73fe\u7269\u6c7a\u6e08\u3002\n\nOps\u306e\u95a2\u308f\u308a\uff1a\u8a3c\u62e0\u91d1\u7ba1\u7406\uff08\u5f53\u521d\uff0b\u5909\u52d5\uff09\u3001\u65e5\u6b21P&L\u30de\u30fc\u30ad\u30f3\u30b0\u3001\u53d6\u5f15\u30e9\u30a4\u30d5\u30b5\u30a4\u30af\u30eb\u30a4\u30d9\u30f3\u30c8\uff08\u30ce\u30d9\u30fc\u30b7\u30e7\u30f3\u3001\u30b3\u30f3\u30d7\u30ec\u30c3\u30b7\u30e7\u30f3\u3001\u884c\u4f7f/\u6e80\u671f\uff09\u3001ISDA\u6587\u66f8\u7ba1\u7406\u3001\u30c8\u30ec\u30fc\u30c9\u30ea\u30dd\u30b8\u30c8\u30ea\u3078\u306e\u898f\u5236\u5831\u544a\u3002',
      beginnerNote:'Derivatives are contracts whose value comes from something else. A futures contract is like pre-ordering a product at a fixed price, you\'re locked in. An option is like paying a small fee to reserve the right to buy later, you can walk away if the price isn\'t right. After the 2008 crisis, rules changed so most derivatives must go through a CCP (central clearinghouse) for safety.',
      beginnerNoteJa:'デリバティブは他のものから価値が生まれる契約です。先物は固定価格での予約注文, 必ず実行しなければなりません。オプションは少額の手数料を払って後で買う権利を確保, 価格が合わなければ見送れます。2008年の危機後、安全のためほとんどのデリバティブはCCP（中央清算機関）を通す規則に変わりました。' },
    { id:'mk5', title:'Market Infrastructure', titleJa:'市場インフラ',
      content:'The "plumbing" that makes financial markets work.\n\nTrading venues:\n• Exchanges (NYSE, NASDAQ, TSE),regulated, transparent order books\n• MTFs (Multilateral Trading Facilities),EU alternative venues\n• Dark pools, anonymous trading for large orders to avoid market impact\n\nClearing: CCPs guarantee both sides of a trade. Examples: LCH (rates, EU equities), CME (futures), JSCC (Japan), ICE Clear (CDS).\n\nSettlement & custody: CSDs (Central Securities Depositories) hold securities and process ownership transfers. DTCC/DTC (US), Euroclear & Clearstream (EU), JASDEC (Japan).\n\nMessaging: SWIFT (Society for Worldwide Interbank Financial Telecommunication),the global messaging network banks use to communicate settlement instructions, payment orders, and trade confirmations.\n\nIdentifiers: LEI (Legal Entity Identifier, unique ID for every company in finance), ISIN (security ID), CUSIP (US security ID), SEDOL (UK).\n\nOps relies on all of these daily, submitting trades to CCPs, sending SSIs via SWIFT, reconciling positions with CSDs.',
      contentJa:'金融市場を動かす「配管」。\n\n取引の場：\n• 取引所（NYSE、NASDAQ、東証）: 規制された透明なオーダーブック\n• MTF（Multilateral Trading Facility、多角的取引施設）: EUの代替取引場\n• ダークプール, 大口注文の市場インパクトを避けるための匿名取引\n\n清算：CCPが取引の両当事者を保証。例：LCH（金利、EU株式）、CME（先物）、JSCC（日本）、ICE Clear（CDS）。\n\n決済・保管：CSD（中央証券保管振替機関）が証券を保管し所有権移転を処理。DTCC/DTC（米国）、Euroclear & Clearstream（EU）、JASDEC（日本）。\n\nメッセージング：SWIFT（国際銀行間金融通信協会）: 銀行が決済指図、支払い指示、取引確認をやり取りするグローバルネットワーク。\n\n識別子：LEI（取引主体識別子, 金融の各法人のユニークID）、ISIN（証券ID）、CUSIP（米国証券ID）、SEDOL（英国）。\n\nOpsはこれら全てを日常的に使う, CCPへの取引提出、SWIFT経由のSSI送信、CSDとのポジション照合。',
      beginnerNote:'Market infrastructure is the behind-the-scenes system. Exchanges are where trades happen. CCPs guarantee trades will complete. CSDs are digital vaults that hold securities. SWIFT is the messaging system banks use to talk to each other, like email but for financial instructions. Without these, no trade could settle.',
      beginnerNoteJa:'市場インフラは舞台裏のシステムです。取引所は取引が行われる場所。CCPは取引の完了を保証。CSDは証券を保管するデジタル金庫。SWIFTは銀行同士が金融指示をやり取りするメッセージングシステム, 金融版メールのようなもの。これらなしでは取引は決済できません。' },
];

// --- Behavioral Questions ---
const behavioralQuestions = [
    { id:'b0', question:'Why the financial industry?', questionJa:'なぜ金融業界を志望しますか？',
      tips:'This is often the first question for candidates without a finance background. Three effective angles: (1) Social infrastructure: finance is the lifeblood of the economy, you want to support businesses and society. (2) Professionalism:you thrive in environments demanding accuracy and expertise. (3) Dynamism:global markets, fast-paced work, constant learning. Connect to your own experiences: accounting for a student club, interest sparked by a news event, a course that opened your eyes. Be specific about what drew you in and why it stuck. New grads: it is completely fine to say your interest is recent. What matters is that your curiosity is genuine and you can explain it.',
      tipsJa:'金融のバックグラウンドがない候補者に最初に聞かれることが多い質問です。効果的な3つの切り口：(1) 社会インフラ: 金融は経済の血液であり、企業や社会を支えたい。(2) プロフェッショナリズム:正確さと専門性が求められる環境で成長したい。(3) ダイナミズム:グローバルな市場、スピード感のある仕事、常に学び続ける環境。自分の経験と結びつける：サークルの会計、ニュースがきっかけの関心、視野を広げた授業。何に惹かれ、なぜそれが続いているかを具体的に。新卒の場合：関心が最近であっても全く問題ありません。好奇心が本物であること、それを説明できることが大切です。',
      starPrompt:{s:'Your background and what sparked your interest in finance',t:'Understanding why finance over other industries',a:'What you researched, learned, or experienced',r:'Why finance is the right fit for your goals'},
      starPromptJa:{s:'あなたの経歴と金融に興味を持ったきっかけ',t:'なぜ他の業界ではなく金融なのかの理解',a:'何を調べ、学び、経験したか',r:'なぜ金融が自分の目標に合っているか'} },
    { id:'b1', question:'Why this company?', questionJa:'なぜこの企業を志望しますか？',
      tips:'Research the company\'s culture, recent initiatives, and strategic direction. Connect to your career goals and values. Mention specific aspects that attracted you. New grads: draw from university courses, internships, or personal interests that sparked your interest in the company.',
      tipsJa:'企業のカルチャー、最近の取り組み、戦略的方向性を調べましょう。自分のキャリア目標と価値観に結びつけて。惹かれた具体的な点に言及。新卒の場合：大学の授業、インターン、企業に興味を持ったきっかけとなった個人的な関心から例を挙げましょう。',
      starPrompt:{s:'Your background',t:'Finding the right firm',a:'What drew you to this company',r:'Why this company is the best fit'},
      starPromptJa:{s:'あなたの経歴',t:'合う企業を見つけること',a:'この企業に惹かれた理由',r:'なぜこの企業が最適か'} },
    { id:'b2', question:'Why Operations?', questionJa:'なぜオペレーション部門を志望しますか？',
      tips:'Show you understand Ops is critical infrastructure, not "back office." Reference trade lifecycle, risk management, process improvement. Connect to your skills (attention to detail, problem-solving, communication). New grads: mention experiences where you enjoyed organizing, problem-solving, or improving processes, even in student clubs or part-time jobs.',
      tipsJa:'Opsが「バックオフィス」ではなく重要インフラであることを理解していると示す。トレードライフサイクル、リスク管理、プロセス改善に言及。自分のスキル（細部への注意、問題解決、コミュニケーション）と結びつける。新卒の場合：サークルやアルバイトでの整理・問題解決・プロセス改善の経験に言及しましょう。',
      starPrompt:{s:'Your interest in finance operations',t:'Understanding the role',a:'Experiences that prepared you',r:'Why Ops is the right fit'},
      starPromptJa:{s:'金融オペレーションへの関心',t:'役割の理解',a:'準備となった経験',r:'なぜOpsが合っているか'} },
    { id:'b3', question:'Tell me about a time you paid close attention to detail and it made a difference.', questionJa:'細部への注意が成果につながった経験を教えてください。',
      tips:'Critical for Ops. Choose an example where your meticulousness prevented an error or improved quality. Quantify impact. New grads: examples from academic research, data analysis homework, or organizing a club event where precision mattered.',
      tipsJa:'Opsで極めて重要。あなたの緻密さがエラーを防止したり品質を向上させた例を選ぶ。インパクトを数値化。新卒の場合：学術研究、データ分析の課題、正確さが重要だったサークルイベントの運営などの例。',
      starPrompt:{s:'The project/task context',t:'What required attention to detail',a:'Specific steps you took',r:'Error prevented or quality improved'},
      starPromptJa:{s:'プロジェクト/タスクの背景',t:'細部への注意が必要だった点',a:'具体的に取った行動',r:'防止されたエラーまたは向上した品質'} },
    { id:'b4', question:'Describe a time you had to manage multiple priorities under a tight deadline.', questionJa:'厳しい締切の中で複数の優先事項を管理した経験を教えてください。',
      tips:'Ops requires multitasking across markets and time zones. Show prioritization, time management, and communication under pressure. New grads: exam periods with overlapping deadlines, or juggling part-time work with academics.',
      tipsJa:'Opsは複数の市場・タイムゾーンを横断するマルチタスクが必要。プレッシャー下での優先順位付け、時間管理、コミュニケーションを示す。新卒の場合：試験期間の重なり、アルバイトと学業の両立などの経験。',
      starPrompt:{s:'The high-pressure situation',t:'Competing priorities and deadlines',a:'How you organized and communicated',r:'All deliverables met on time'},
      starPromptJa:{s:'プレッシャーの大きい状況',t:'競合する優先事項と締切',a:'どう整理しコミュニケーションしたか',r:'全ての成果物を期日通りに達成'} },
    { id:'b5', question:'Tell me about a time you identified and resolved a process inefficiency.', questionJa:'プロセスの非効率を特定し改善した経験を教えてください。',
      tips:'Process improvement is core to Ops. Show analytical thinking, initiative, and quantified results. Mention stakeholder buy-in. New grads: streamlining club operations, improving a study group workflow, or automating a repetitive task.',
      tipsJa:'プロセス改善はOpsの核。分析的思考、主体性、定量的成果を示す。ステークホルダーの賛同にも言及。新卒の場合：サークル運営の効率化、勉強会のワークフロー改善、繰り返しタスクの自動化など。',
      starPrompt:{s:'The inefficient process',t:'The problem and its impact',a:'Your analysis and proposed solution',r:'Measurable improvement achieved'},
      starPromptJa:{s:'非効率なプロセス',t:'問題とその影響',a:'分析と提案した解決策',r:'達成された定量的改善'} },
    { id:'b6', question:'Give an example of working effectively in a team across different functions.', questionJa:'異なる部門のチームと効果的に協力した例を教えてください。',
      tips:'Ops works cross-functionally with Trading, Technology, Legal, Compliance. Show communication skills and ability to bridge different perspectives. New grads: group projects with diverse team members, cross-departmental student organization initiatives.',
      tipsJa:'Opsはトレーディング、テクノロジー、法務、コンプライアンスと横断的に連携。コミュニケーション能力と異なる視点をつなぐ力を示す。新卒の場合：多様なメンバーとのグループプロジェクト、学生団体の部門横断的な活動。',
      starPrompt:{s:'The cross-functional project',t:'Different teams involved',a:'How you facilitated collaboration',r:'Successful outcome through teamwork'},
      starPromptJa:{s:'部門横断プロジェクト',t:'関わったチーム',a:'どう協力を促進したか',r:'チームワークによる成功'} },
    { id:'b7', question:'Describe a time you made a mistake and how you handled it.', questionJa:'ミスをした経験と、それにどう対処したか教えてください。',
      tips:'Be honest and show accountability. Focus on quick escalation, root cause analysis, and preventive measures. Ops values transparency. New grads: academic setbacks, project mistakes, or part-time job errors, the key is showing how you took responsibility and learned.',
      tipsJa:'正直に責任を示す。迅速なエスカレーション、根本原因分析、再発防止策に焦点。Opsは透明性を重視。新卒の場合：学業での挫折、プロジェクトのミス、アルバイトでのエラー, 責任を取り学んだことを示すのがポイント。',
      starPrompt:{s:'What happened',t:'The impact of the mistake',a:'How you escalated and fixed it',r:'Lessons learned and controls added'},
      starPromptJa:{s:'何が起きたか',t:'ミスの影響',a:'エスカレーションと修正方法',r:'学びと追加されたコントロール'} },
    { id:'b8', question:'How do you stay organized and ensure accuracy in your work?', questionJa:'仕事の正確性をどう確保し、整理整頓していますか？',
      tips:'Discuss specific methods: checklists, double-checking, reconciliation mindset, automation. Connect to Ops DNA. New grads: study habits, how you organize notes, project management tools you use, or personal productivity systems.',
      tipsJa:'具体的な方法を議論：チェックリスト、ダブルチェック、照合マインドセット、自動化。OpsのDNAに結びつける。新卒の場合：勉強の習慣、ノートの整理法、使っているプロジェクト管理ツール、個人の生産性システム。',
      starPrompt:{s:'A task requiring precision',t:'Accuracy requirements',a:'Systems and habits you use',r:'Consistent accuracy record'},
      starPromptJa:{s:'精度が求められたタスク',t:'正確性の要件',a:'使っているシステムや習慣',r:'一貫した正確性の実績'} },
    { id:'b9', question:'Tell me about yourself, Self-PR', questionJa:'自己紹介・自己PRをお願いします',
      tips:'Keep it to 1-2 minutes. Structure: university/major, one key experience that shaped you, why you are here today. Do NOT recite your resume. Focus on one or two things that show your character. End by connecting to why this role excites you. Be natural and conversational, this is your first impression.',
      tipsJa:'1-2分にまとめましょう。構成：大学・専攻、自分を形作った1つの経験、なぜ今日ここにいるか。履歴書の読み上げはNG。自分の人柄が伝わるエピソードを1-2個に絞る。最後にこの仕事に興味がある理由につなげる。自然体で会話するように, これが第一印象です。',
      starPrompt:{s:'Your background and university life',t:'What you want to convey about yourself',a:'Key experiences and what you learned',r:'Why you are a good fit for this role'},
      starPromptJa:{s:'あなたの経歴と大学生活',t:'自分について伝えたいこと',a:'主要な経験と学んだこと',r:'なぜこの役割に合っているか'} },
    { id:'b10', question:'What did you put the most effort into during university?', questionJa:'学生時代に最も力を入れたことは何ですか？（ガクチカ）',
      tips:'This is THE most common question in Japanese new-grad interviews. Choose ONE story and go deep. The interviewer wants to see: (1) Why you chose it, (2) What was hard about it, (3) How you pushed through, (4) What you learned. Good topics: research, club leadership, part-time work challenges, study abroad, volunteer work. Bad approach: listing many things superficially. Be specific with numbers and details.',
      tipsJa:'日本の新卒面接で最も聞かれる質問です。1つのエピソードを深く掘り下げましょう。面接官が見ているのは：(1) なぜそれを選んだか、(2) 何が大変だったか、(3) どう乗り越えたか、(4) 何を学んだか。良いテーマ：研究、サークルのリーダーシップ、アルバイトでの課題、留学、ボランティア。NG：多くのことを浅く並べる。数字や具体的な詳細を入れましょう。',
      starPrompt:{s:'What you chose to dedicate yourself to and why',t:'The challenge or goal you faced',a:'Specific steps you took to overcome difficulties',r:'What you achieved and what it taught you'},
      starPromptJa:{s:'何に打ち込んだか、なぜそれを選んだか',t:'直面した課題や目標',a:'困難を乗り越えるために取った具体的な行動',r:'何を達成し、何を学んだか'} },
    { id:'b11', question:'What are your strengths and weaknesses?', questionJa:'あなたの長所と短所を教えてください',
      tips:'Strengths: pick one that is relevant to Ops (e.g., attention to detail, persistence, ability to stay calm under pressure). Back it up with a SHORT example. Weaknesses: be honest but show self-awareness and improvement. Good: "I tend to be too cautious, so I have been practicing making faster decisions while maintaining accuracy." Bad: "I work too hard" (cliche) or something that is a deal-breaker for the role.',
      tipsJa:'長所：Opsに関連するものを1つ選ぶ（例：細部への注意力、粘り強さ、プレッシャーの中での冷静さ）。短いエピソードで裏付ける。短所：正直に、でも自己認識と改善努力を見せる。良い例：「慎重すぎる面があるので、正確さを保ちつつ判断を早くする練習をしています」。NG：「頑張りすぎること」（陳腐）、その職種に致命的な弱点。',
      starPrompt:{s:'Context where your strength/weakness appeared',t:'What was at stake',a:'How your strength helped / How you manage your weakness',r:'Positive outcome / Progress in improvement'},
      starPromptJa:{s:'長所・短所が現れた場面',t:'何がかかっていたか',a:'長所がどう活きたか / 短所をどう管理しているか',r:'良い結果 / 改善の進歩'} },
    { id:'b12', question:'What recent financial news has caught your attention?', questionJa:'最近気になった金融ニュースは何ですか？',
      tips:'You do NOT need deep expertise. The interviewer is checking: (1) Do you follow the news at all? (2) Can you explain it simply? (3) Can you connect it to Operations? Pick ONE news item you genuinely found interesting. Explain what happened, why it matters, and (bonus) how it might affect Operations. Sources: Nikkei, Bloomberg, Financial Times headlines are enough. If you do not know much, be honest: "I have been following X because..." is better than faking knowledge.',
      tipsJa:'深い専門知識は不要です。面接官が確認しているのは：(1) ニュースを見ているか？ (2) 簡潔に説明できるか？ (3) オペレーションと結びつけられるか？ 本当に興味を持ったニュースを1つ選びましょう。何が起きたか、なぜ重要か、（ボーナス）Opsにどう影響するかを説明。情報源：日経、Bloomberg、Financial Timesの見出しで十分。あまり知らなくても正直に：「〜に興味を持って追っています」が知識を装うより良い。',
      starPrompt:{s:'The news event and when you noticed it',t:'Why it caught your attention',a:'What you researched and understood',r:'How it connects to Operations or the financial industry'},
      starPromptJa:{s:'そのニュースと気づいたきっかけ',t:'なぜ興味を持ったか',a:'何を調べて理解したか',r:'オペレーションや金融業界とどうつながるか'} },
    { id:'b13', question:'Are you comfortable with detailed, repetitive work?', questionJa:'地道で細かい作業は苦になりませんか？',
      tips:'Be honest. Operations involves repetitive, detail-oriented tasks daily, reconciliation, checking, data validation. The interviewer wants to know you will not get bored or careless. Good approach: give a real example of when you did meticulous work and found satisfaction in it. Show that you understand accuracy matters and that you take pride in getting things right. It is OK to say "I find it rewarding when everything matches perfectly."',
      tipsJa:'正直に答えましょう。Opsは毎日、照合、確認、データ検証など地道で正確さが求められる作業があります。面接官は飽きたり不注意にならないか知りたい。良いアプローチ：実際に細かい作業をして満足感を得た経験を話す。正確さが大切だと理解していること、きちんとやり遂げることに誇りを持っていることを示す。「全部合った時の達成感が好きです」は良い回答です。',
      starPrompt:{s:'A situation involving detailed, repetitive work',t:'What accuracy was required',a:'How you maintained focus and quality',r:'Outcome and what you found rewarding about it'},
      starPromptJa:{s:'地道で細かい作業が求められた場面',t:'どの程度の正確さが必要だったか',a:'集中力と品質をどう維持したか',r:'結果と、その中で何にやりがいを感じたか'} },
];

// --- Technical Q&A ---
const technicalQuestions = [
    { id:'tq1', question:'What is a trade break and how would you resolve it?', questionJa:'トレードブレークとは何ですか？どう解決しますか？',
      answer:'A trade break is a discrepancy between two sets of records, your firm\'s internal booking vs the counterparty/CCP/custodian\'s record. Common causes: quantity or price mismatch, wrong settlement date, incorrect SSIs, missed allocations.\n\nResolution process:\n1. Identify the break in the daily reconciliation report\n2. Compare trade details field by field (quantity, price, settlement date, SSIs, trade date)\n3. Determine which side is correct (check execution reports, trading system records)\n4. Contact the counterparty to agree on the correct version\n5. Amend the incorrect booking\n6. Escalate aged breaks (unresolved beyond a set number of days) to management\n\nWhy it matters: unresolved breaks can cause settlement fails, incorrect P&L, regulatory reporting errors, and financial loss.',
      answerJa:'\u30c8\u30ec\u30fc\u30c9\u30d6\u30ec\u30fc\u30af\u306f2\u3064\u306e\u8a18\u9332\u306e\u4e0d\u4e00\u81f4, \u81ea\u793e\u306e\u5185\u90e8\u8a18\u5e33 vs \u30ab\u30a6\u30f3\u30bf\u30fc\u30d1\u30fc\u30c6\u30a3/CCP/\u30ab\u30b9\u30c8\u30c7\u30a3\u30a2\u30f3\u306e\u8a18\u9332\u3002\u4e00\u822c\u7684\u306a\u539f\u56e0\uff1a\u6570\u91cf\u30fb\u4fa1\u683c\u306e\u4e0d\u4e00\u81f4\u3001\u6c7a\u6e08\u65e5\u306e\u8aa4\u308a\u3001SSI\u306e\u9593\u9055\u3044\u3001\u30a2\u30ed\u30b1\u30fc\u30b7\u30e7\u30f3\u6f0f\u308c\u3002\n\n\u89e3\u6c7a\u30d7\u30ed\u30bb\u30b9\uff1a\n1. \u65e5\u6b21\u7167\u5408\u30ec\u30dd\u30fc\u30c8\u3067\u30d6\u30ec\u30fc\u30af\u3092\u7279\u5b9a\n2. \u53d6\u5f15\u8a73\u7d30\u3092\u30d5\u30a3\u30fc\u30eb\u30c9\u3054\u3068\u306b\u6bd4\u8f03\uff08\u6570\u91cf\u3001\u4fa1\u683c\u3001\u6c7a\u6e08\u65e5\u3001SSI\u3001\u7d04\u5b9a\u65e5\uff09\n3. \u3069\u3061\u3089\u306e\u8a73\u7d30\u304c\u6b63\u3057\u3044\u304b\u5224\u65ad\uff08\u7d04\u5b9a\u5831\u544a\u3001\u53d6\u5f15\u30b7\u30b9\u30c6\u30e0\u306e\u8a18\u9332\u3092\u78ba\u8a8d\uff09\n4. \u30ab\u30a6\u30f3\u30bf\u30fc\u30d1\u30fc\u30c6\u30a3\u306b\u9023\u7d61\u3057\u6b63\u3057\u3044\u5185\u5bb9\u3067\u5408\u610f\n5. \u81ea\u793e\u30b7\u30b9\u30c6\u30e0\u3067\u8aa4\u3063\u305f\u8a18\u5e33\u3092\u4fee\u6b63\n6. \u9577\u671f\u5316\u3057\u305f\u30d6\u30ec\u30fc\u30af\u3092\u30de\u30cd\u30b8\u30e1\u30f3\u30c8\u306b\u30a8\u30b9\u30ab\u30ec\u30fc\u30b7\u30e7\u30f3\n\n\u306a\u305c\u91cd\u8981\u304b\uff1a\u672a\u89e3\u6c7a\u306e\u30d6\u30ec\u30fc\u30af\u306f\u6c7a\u6e08\u5931\u6557\u3001P&L\u306e\u8aa4\u308a\u3001\u898f\u5236\u5831\u544a\u306e\u30a8\u30e9\u30fc\u3001\u91d1\u92ad\u7684\u640d\u5931\u3092\u5f15\u304d\u8d77\u3053\u3059\u3002',
      beginnerNote:'Imagine you and a friend swapped items but wrote down different details about what was exchanged. A "break" is when records don\'t match, and someone needs to figure out what really happened.',
      beginnerNoteJa:'友達とアイテムを交換したけど、お互い交換内容を違うように書いてしまった状態を想像してください。「ブレーク」は記録が一致しないことで、何が本当に起きたか突き止める必要があります。' },
    { id:'tq2', question:'Explain DvP and why it matters.', questionJa:'DvP（Delivery vs Payment）とは何か、なぜ重要か説明してください。',
      answer:'DvP (Delivery versus Payment) ensures the simultaneous exchange of securities and cash.\n\nWhy it matters: Without DvP, there is "principal risk", one party delivers securities but the other doesn\'t pay. The exposed party could lose the FULL value of the trade.\n\nDvP models (BIS classification):\n\u2022 Model 1: gross securities, gross cash (instruction-by-instruction)\n\u2022 Model 2: gross securities, net cash\n\u2022 Model 3: net securities, net cash (most efficient)\n\nRelated: FoP (Free of Payment) = delivery without corresponding cash. Used in collateral movements and internal transfers. FoP carries principal risk.\n\nIn practice: Most equity/bond trades settle DvP through a CSD. FX uses PvP (Payment versus Payment) through CLS.',
      answerJa:'DvP\uff08Delivery versus Payment\uff09\u306f\u8a3c\u5238\u3068\u73fe\u91d1\u306e\u540c\u6642\u4ea4\u63db\u3092\u4fdd\u8a3c\u3059\u308b\u4ed5\u7d44\u307f\u3002\n\n\u306a\u305c\u91cd\u8981\u304b\uff1aDvP\u304c\u306a\u3051\u308c\u3070\u300c\u5143\u672c\u30ea\u30b9\u30af\u300d\u304c\u5b58\u5728, \u4e00\u65b9\u304c\u8a3c\u5238\u3092\u5f15\u304d\u6e21\u3057\u305f\u306e\u306b\u4ed6\u65b9\u304c\u652f\u6255\u308f\u306a\u3044\u30ea\u30b9\u30af\u3002\u66b4\u9732\u3055\u308c\u308b\u5074\u306f\u53d6\u5f15\u306e\u5168\u984d\u3092\u5931\u3046\u53ef\u80fd\u6027\u304c\u3042\u308b\u3002\n\nDvP\u30e2\u30c7\u30eb\uff08BIS\u5206\u985e\uff09\uff1a\n\u2022 \u30e2\u30c7\u30eb1\uff1a\u30b0\u30ed\u30b9\u8a3c\u5238\u3001\u30b0\u30ed\u30b9\u73fe\u91d1\uff08\u6307\u56f3\u3054\u3068\uff09\n\u2022 \u30e2\u30c7\u30eb2\uff1a\u30b0\u30ed\u30b9\u8a3c\u5238\u3001\u30cd\u30c3\u30c8\u73fe\u91d1\n\u2022 \u30e2\u30c7\u30eb3\uff1a\u30cd\u30c3\u30c8\u8a3c\u5238\u3001\u30cd\u30c3\u30c8\u73fe\u91d1\uff08\u6700\u3082\u52b9\u7387\u7684\uff09\n\n\u95a2\u9023\uff1aFoP\uff08Free of Payment\uff09= \u5bfe\u5fdc\u3059\u308b\u73fe\u91d1\u306a\u3057\u3067\u8a3c\u5238\u3092\u5f15\u304d\u6e21\u3059\u3053\u3068\u3002\u62c5\u4fdd\u79fb\u52d5\u3084\u5185\u90e8\u632f\u66ff\u3067\u4f7f\u7528\u3002FoP\u306b\u306f\u5143\u672c\u30ea\u30b9\u30af\u304c\u3042\u308b\u3002\n\n\u5b9f\u52d9\uff1a\u307b\u3068\u3093\u3069\u306e\u682a\u5f0f\u30fb\u50b5\u5238\u53d6\u5f15\u306fCSD\u3092\u901a\u3058\u3066DvP\u3067\u6c7a\u6e08\u3002FX\u306fCLS\u3092\u901a\u3058\u3066PvP\uff08Payment versus Payment\uff09\u3092\u4f7f\u7528\u3002',
      beginnerNote:'DvP means both sides hand over at the same time, securities and cash are exchanged simultaneously. Without it, one side might send their part and never receive anything back. Think of it as "let\'s trade on the count of three."',
      beginnerNoteJa:'DvP\u306f\u53cc\u65b9\u304c\u540c\u6642\u306b\u5f15\u304d\u6e21\u3059\u3068\u3044\u3046\u3053\u3068, \u8a3c\u5238\u3068\u73fe\u91d1\u304c\u540c\u6642\u306b\u4ea4\u63db\u3055\u308c\u308b\u3002\u3053\u308c\u304c\u306a\u3051\u308c\u3070\u3001\u4e00\u65b9\u304c\u5148\u306b\u6e21\u3057\u3066\u4f55\u3082\u53d7\u3051\u53d6\u308c\u306a\u3044\u30ea\u30b9\u30af\u304c\u3042\u308b\u3002\u300c\u305b\u30fc\u306e\u3067\u540c\u6642\u4ea4\u63db\u300d\u306e\u91d1\u878d\u7248\u3060\u3068\u601d\u3063\u3066\u304f\u3060\u3055\u3044\u3002' },
    { id:'tq3', question:'What is the role of a CCP?', questionJa:'CCPの役割は何ですか？',
      answer:'A CCP (Central Counterparty) interposes itself between buyer and seller via "novation", becoming the buyer to every seller and vice versa.\n\nKey functions:\n1. Counterparty risk reduction, if one side defaults, the CCP covers the loss\n2. Netting, instead of 100 separate settlements, net down to a handful\n3. Default management, waterfall: defaulter\'s margin \u2192 default fund \u2192 CCP equity \u2192 surviving members\' fund\n4. Margining, collects initial margin (upfront) and variation margin (daily)\n\nNot all products are cleared: Exchange-traded derivatives always are. Post-2008 reforms mandated clearing for standardized OTC derivatives (e.g., IRS). Bilateral OTC still uses CSA-based collateral.\n\nExamples: LCH (largest for IRS), CME (futures), JSCC (Japan), ICE Clear (CDS), Eurex Clearing (EU).',
      answerJa:'CCP\uff08\u4e2d\u592e\u6e05\u7b97\u6a5f\u95a2\uff09\u306f\u300c\u30ce\u30d9\u30fc\u30b7\u30e7\u30f3\uff08\u66f4\u6539\uff09\u300d\u3092\u901a\u3058\u3066\u8cb7\u3044\u624b\u3068\u58f2\u308a\u624b\u306e\u9593\u306b\u5165\u308a\u3001\u5168\u58f2\u308a\u624b\u306b\u5bfe\u3059\u308b\u8cb7\u3044\u624b\u3001\u5168\u8cb7\u3044\u624b\u306b\u5bfe\u3059\u308b\u58f2\u308a\u624b\u3068\u306a\u308b\u3002\n\n\u4e3b\u306a\u6a5f\u80fd\uff1a\n1. \u30ab\u30a6\u30f3\u30bf\u30fc\u30d1\u30fc\u30c6\u30a3\u30ea\u30b9\u30af\u306e\u524a\u6e1b, \u4e00\u65b9\u304c\u30c7\u30d5\u30a9\u30eb\u30c8\u3057\u3066\u3082CCP\u304c\u640d\u5931\u3092\u30ab\u30d0\u30fc\n2. \u30cd\u30c3\u30c6\u30a3\u30f3\u30b0, 100\u4ef6\u306e\u500b\u5225\u6c7a\u6e08\u3092\u6570\u4ef6\u306b\u307e\u3068\u3081\u308b\n3. \u30c7\u30d5\u30a9\u30eb\u30c8\u7ba1\u7406, \u30a6\u30a9\u30fc\u30bf\u30fc\u30d5\u30a9\u30fc\u30eb\uff1a\u30c7\u30d5\u30a9\u30eb\u30c8\u8005\u306e\u8a3c\u62e0\u91d1 \u2192 \u30c7\u30d5\u30a9\u30eb\u30c8\u30d5\u30a1\u30f3\u30c9 \u2192 CCP\u81ea\u5df1\u8cc7\u672c \u2192 \u5b58\u7d9a\u30e1\u30f3\u30d0\u30fc\u306e\u30d5\u30a1\u30f3\u30c9\n4. \u30de\u30fc\u30b8\u30cb\u30f3\u30b0, \u5f53\u521d\u8a3c\u62e0\u91d1\uff08\u524d\u6255\u3044\uff09\u3068\u5909\u52d5\u8a3c\u62e0\u91d1\uff08\u65e5\u6b21\uff09\u3092\u5fb4\u53ce\n\n\u5168\u3066\u306e\u5546\u54c1\u304c\u6e05\u7b97\u3055\u308c\u308b\u308f\u3051\u3067\u306f\u306a\u3044\uff1a\u53d6\u5f15\u6240\u30c7\u30ea\u30d0\u30c6\u30a3\u30d6\u306f\u5e38\u306b\u6e05\u7b97\u30022008\u5e74\u4ee5\u964d\u306e\u6539\u9769\u3067\u6a19\u6e96\u5316OTC\u30c7\u30ea\u30d0\u30c6\u30a3\u30d6\uff08IRS\u7b49\uff09\u306e\u6e05\u7b97\u3092\u7fa9\u52d9\u5316\u3002\u4e8c\u8005\u9593OTC\u306f\u4f9d\u7136\u3068\u3057\u3066CSA\u30d9\u30fc\u30b9\u306e\u62c5\u4fdd\u3092\u4f7f\u7528\u3002\n\n\u4f8b\uff1aLCH\uff08IRS\u6700\u5927\u624b\uff09\u3001CME\uff08\u5148\u7269\uff09\u3001JSCC\uff08\u65e5\u672c\uff09\u3001ICE Clear\uff08CDS\uff09\u3001Eurex Clearing\uff08EU\uff09\u3002',
      beginnerNote:'The CCP is a trusted middleman. When two strangers trade, the CCP steps in between. If one can\'t pay, the CCP covers it using collected deposits (margins). This is why markets function even between parties who don\'t trust each other.',
      beginnerNoteJa:'CCP\u306f\u4fe1\u983c\u3067\u304d\u308b\u4ef2\u4ecb\u8005\u3002\u898b\u77e5\u3089\u306c\u8005\u540c\u58eb\u304c\u53d6\u5f15\u3059\u308b\u6642\u3001CCP\u304c\u9593\u306b\u5165\u308b\u3002\u4e00\u65b9\u304c\u652f\u6255\u3048\u306a\u304f\u306a\u3063\u3066\u3082\u3001CCP\u304c\u9810\u304b\u3063\u305f\u4fdd\u8a3c\u91d1\uff08\u8a3c\u62e0\u91d1\uff09\u3067\u30ab\u30d0\u30fc\u3002\u3060\u304b\u3089\u4e92\u3044\u3092\u4fe1\u983c\u3057\u3066\u3044\u306a\u3044\u5f53\u4e8b\u8005\u9593\u3067\u3082\u5e02\u5834\u304c\u6a5f\u80fd\u3067\u304d\u308b\u3002' },
    { id:'tq4', question:'What happens when a trade fails to settle?', questionJa:'取引の決済が失敗するとどうなりますか？',
      answer:'A settlement fail occurs when securities or cash are not delivered on the intended settlement date.\n\nCommon causes:\n\u2022 Seller doesn\'t have securities (short position, pending receipt from another trade)\n\u2022 Incorrect SSIs (wrong account, wrong custodian)\n\u2022 Operational errors (wrong settlement date, unmatched instructions)\n\u2022 Counterparty-side issues (their custodian rejects the instruction)\n\nImpact:\n\u2022 Funding costs (borrowing securities or cash to cover the gap)\n\u2022 Regulatory penalties, CSDR in EU imposes cash penalties and mandatory buy-ins for persistent fails\n\u2022 Reputational risk with counterparties and regulators\n\u2022 Cascading effect, your fail may cause your counterparty\'s trade to fail too\n\nResolution: Investigate root cause \u2192 contact counterparty/custodian \u2192 arrange partial settlement if possible \u2192 explore securities lending \u2192 escalate aged fails.',
      answerJa:'\u6c7a\u6e08\u5931\u6557\u306f\u4e88\u5b9a\u6c7a\u6e08\u65e5\u306b\u8a3c\u5238\u307e\u305f\u306f\u73fe\u91d1\u304c\u5f15\u304d\u6e21\u3055\u308c\u306a\u304b\u3063\u305f\u5834\u5408\u306b\u767a\u751f\u3002\n\n\u4e00\u822c\u7684\u306a\u539f\u56e0\uff1a\n\u2022 \u58f2\u308a\u624b\u304c\u8a3c\u5238\u3092\u4fdd\u6709\u3057\u3066\u3044\u306a\u3044\uff08\u30b7\u30e7\u30fc\u30c8\u30dd\u30b8\u30b7\u30e7\u30f3\u3001\u5225\u53d6\u5f15\u304b\u3089\u306e\u53d7\u3051\u53d6\u308a\u5f85\u3061\uff09\n\u2022 SSI\u306e\u8aa4\u308a\uff08\u53e3\u5ea7\u756a\u53f7\u3001\u30ab\u30b9\u30c8\u30c7\u30a3\u30a2\u30f3\u306e\u9593\u9055\u3044\uff09\n\u2022 \u30aa\u30da\u30ec\u30fc\u30b7\u30e7\u30f3\u30a8\u30e9\u30fc\uff08\u6c7a\u6e08\u65e5\u306e\u9593\u9055\u3044\u3001\u30de\u30c3\u30c1\u3057\u3066\u3044\u306a\u3044\u6307\u56f3\uff09\n\u2022 \u30ab\u30a6\u30f3\u30bf\u30fc\u30d1\u30fc\u30c6\u30a3\u5074\u306e\u554f\u984c\uff08\u5148\u65b9\u306e\u30ab\u30b9\u30c8\u30c7\u30a3\u30a2\u30f3\u304c\u6307\u56f3\u3092\u62d2\u5426\uff09\n\n\u5f71\u97ff\uff1a\n\u2022 \u8cc7\u91d1\u8abf\u9054\u30b3\u30b9\u30c8\uff08\u30ae\u30e3\u30c3\u30d7\u3092\u30ab\u30d0\u30fc\u3059\u308b\u305f\u3081\u306e\u8a3c\u5238\u30fb\u73fe\u91d1\u306e\u501f\u5165\uff09\n\u2022 \u898f\u5236\u30da\u30ca\u30eb\u30c6\u30a3, EU\u306eCSDR\u306f\u73fe\u91d1\u30da\u30ca\u30eb\u30c6\u30a3\u3068\u9577\u671f\u30d5\u30a7\u30a4\u30eb\u3078\u306e\u5f37\u5236\u30d0\u30a4\u30a4\u30f3\u3092\u8ab2\u3059\n\u2022 \u30ab\u30a6\u30f3\u30bf\u30fc\u30d1\u30fc\u30c6\u30a3\u3084\u898f\u5236\u5f53\u5c40\u304b\u3089\u306e\u30ec\u30d4\u30e5\u30c6\u30fc\u30b7\u30e7\u30f3\u30ea\u30b9\u30af\n\u2022 \u9023\u9396\u7684\u5f71\u97ff, \u3042\u306a\u305f\u306e\u30d5\u30a7\u30a4\u30eb\u304c\u30ab\u30a6\u30f3\u30bf\u30fc\u30d1\u30fc\u30c6\u30a3\u306e\u30d5\u30a7\u30a4\u30eb\u3082\u5f15\u304d\u8d77\u3053\u3059\u53ef\u80fd\u6027\n\n\u89e3\u6c7a\uff1a\u6839\u672c\u539f\u56e0\u3092\u8abf\u67fb \u2192 \u30ab\u30a6\u30f3\u30bf\u30fc\u30d1\u30fc\u30c6\u30a3/\u30ab\u30b9\u30c8\u30c7\u30a3\u30a2\u30f3\u306b\u9023\u7d61 \u2192 \u53ef\u80fd\u306a\u3089\u90e8\u5206\u6c7a\u6e08\u3092\u624b\u914d \u2192 \u8a3c\u5238\u8cb8\u501f\u3092\u691c\u8a0e \u2192 \u9577\u671f\u30d5\u30a7\u30a4\u30eb\u3092\u30a8\u30b9\u30ab\u30ec\u30fc\u30b7\u30e7\u30f3\u3002',
      beginnerNote:'Like an online order that wasn\'t delivered on time. The buyer doesn\'t have their item, the seller doesn\'t have the money, and penalties may apply. Operations needs to figure out why and fix it quickly.',
      beginnerNoteJa:'ネット通販で注文した商品が時間通りに届かないようなもの。買い手は商品がなく、売り手はお金がなく、ペナルティが発生することも。Opsは原因を突き止めて早急に修正する必要があります。' },
    { id:'tq5', question:'What is reconciliation and why is it important?', questionJa:'照合（リコンシリエーション）とは何で、なぜ重要ですか？',
      answer:'Reconciliation ("recon") is comparing two independent sets of records to confirm they agree.\n\nMain types:\n\u2022 Trade recon, your records vs counterparty\'s (did we both book the same trade?)\n\u2022 Position recon, your books vs custodian/CSD (do we agree on holdings?)\n\u2022 Cash recon, your cash ledger vs bank/nostro account (does our cash balance match?)\n\u2022 P&L recon, front office vs back office P&L\n\nWhy it\'s critical: Detects booking errors before they become settlement fails, uncovers potential fraud, ensures accurate financial reporting, and is required by regulations (SOX, Basel) for internal controls.\n\nIn practice: Ops runs daily recon reports. Breaks are investigated and resolved. STP matching rates are a key Ops KPI, top firms target 95%+ auto-match rates.',
      answerJa:'\u7167\u5408\uff08\u300c\u30ea\u30b3\u30f3\u300d\uff09\u306f2\u3064\u306e\u72ec\u7acb\u3057\u305f\u8a18\u9332\u30bb\u30c3\u30c8\u3092\u6bd4\u8f03\u3057\u4e00\u81f4\u3092\u78ba\u8a8d\u3059\u308b\u3053\u3068\u3002\n\n\u4e3b\u306a\u7a2e\u985e\uff1a\n\u2022 \u53d6\u5f15\u7167\u5408, \u81ea\u793e\u8a18\u9332 vs \u30ab\u30a6\u30f3\u30bf\u30fc\u30d1\u30fc\u30c6\u30a3\u306e\u8a18\u9332\uff08\u540c\u3058\u53d6\u5f15\u3092\u8a18\u5e33\u3057\u3066\u3044\u308b\u304b\uff1f\uff09\n\u2022 \u30dd\u30b8\u30b7\u30e7\u30f3\u7167\u5408, \u81ea\u793e\u5e33\u7c3f vs \u30ab\u30b9\u30c8\u30c7\u30a3\u30a2\u30f3/CSD\uff08\u4fdd\u6709\u91cf\u306f\u4e00\u81f4\u3057\u3066\u3044\u308b\u304b\uff1f\uff09\n\u2022 \u73fe\u91d1\u7167\u5408, \u81ea\u793e\u73fe\u91d1\u53f0\u5e33 vs \u9280\u884c/\u30ce\u30b9\u30c8\u30ed\u53e3\u5ea7\uff08\u73fe\u91d1\u6b8b\u9ad8\u306f\u4e00\u81f4\u3059\u308b\u304b\uff1f\uff09\n\u2022 P&L\u7167\u5408, \u30d5\u30ed\u30f3\u30c8\u30aa\u30d5\u30a3\u30b9 vs \u30d0\u30c3\u30af\u30aa\u30d5\u30a3\u30b9\u306eP&L\n\n\u306a\u305c\u91cd\u8981\u304b\uff1a\u8a18\u5e33\u30a8\u30e9\u30fc\u3092\u6c7a\u6e08\u5931\u6557\u306b\u306a\u308b\u524d\u306b\u691c\u51fa\u3001\u4e0d\u6b63\u306e\u767a\u898b\u3001\u6b63\u78ba\u306a\u8ca1\u52d9\u5831\u544a\u3092\u78ba\u4fdd\u3001\u898f\u5236\uff08SOX\u6cd5\u3001\u30d0\u30fc\u30bc\u30eb\uff09\u304c\u5185\u90e8\u7d71\u5236\u3068\u3057\u3066\u8981\u6c42\u3002\n\n\u5b9f\u52d9\uff1aOps\u306f\u65e5\u6b21\u3067\u7167\u5408\u30ec\u30dd\u30fc\u30c8\u3092\u5b9f\u884c\u3002\u30d6\u30ec\u30fc\u30af\u306f\u8abf\u67fb\u30fb\u89e3\u6c7a\u3002STP\u30de\u30c3\u30c1\u30f3\u30b0\u7387\u306fOps\u306e\u91cd\u8981KPI, \u30c8\u30c3\u30d7\u4f01\u696d\u306f95%\u4ee5\u4e0a\u306e\u81ea\u52d5\u30de\u30c3\u30c1\u7387\u3092\u76ee\u6a19\u3002',
      beginnerNote:'Like checking your bank statement against your own spending records. If the numbers don\'t match, something went wrong and you need to find out what. Banks do this every day with thousands of transactions.',
      beginnerNoteJa:'自分の支出記録と銀行の明細を照らし合わせるようなもの。数字が合わなければ何かが間違っていて、何が起きたか調べる必要があります。銀行は毎日、何千もの取引でこれを行っています。' },
    { id:'tq6', question:'Explain the difference between initial margin and variation margin.', questionJa:'当初証拠金と変動証拠金の違いを説明してください。',
      answer:'Both are collateral used to manage risk in derivatives/cleared trades.\n\nInitial Margin (IM):\n\u2022 Posted upfront when opening a position\n\u2022 Based on potential future exposure (worst-case loss over close-out period)\n\u2022 Calculated via models (ISDA SIMM for bilateral, CCP\'s own model for cleared)\n\u2022 Held in segregated accounts, protected from counterparty default\n\nVariation Margin (VM):\n\u2022 Exchanged daily based on mark-to-market\n\u2022 Reflects actual gains/losses, winner receives VM from loser\n\u2022 Settled in cash (sometimes securities)\n\u2022 Resets exposure to zero every day\n\nKey difference: IM protects against FUTURE potential loss. VM settles TODAY\'s actual gain/loss.\n\nPost-2008: UMR (Uncleared Margin Rules) now requires both IM and VM for bilateral OTC derivatives above certain thresholds.',
      answerJa:'\u4e21\u65b9\u3068\u3082\u30c7\u30ea\u30d0\u30c6\u30a3\u30d6/\u6e05\u7b97\u53d6\u5f15\u306e\u30ea\u30b9\u30af\u7ba1\u7406\u306b\u4f7f\u308f\u308c\u308b\u62c5\u4fdd\u3002\n\n\u5f53\u521d\u8a3c\u62e0\u91d1\uff08IM\uff09\uff1a\n\u2022 \u30dd\u30b8\u30b7\u30e7\u30f3\u958b\u8a2d\u6642\u306b\u524d\u6255\u3044\u3067\u5dee\u3057\u5165\u308c\n\u2022 \u6f5c\u5728\u7684\u306a\u5c06\u6765\u30a8\u30af\u30b9\u30dd\u30fc\u30b8\u30e3\u30fc\u306b\u57fa\u3065\u304f\uff08\u30af\u30ed\u30fc\u30ba\u30a2\u30a6\u30c8\u671f\u9593\u306e\u6700\u60aa\u640d\u5931\uff09\n\u2022 \u30e2\u30c7\u30eb\u3067\u8a08\u7b97\uff08\u4e8c\u8005\u9593\u306fISDA SIMM\u3001\u6e05\u7b97\u53d6\u5f15\u306fCCP\u306e\u72ec\u81ea\u30e2\u30c7\u30eb\uff09\n\u2022 \u5206\u5225\u7ba1\u7406\u53e3\u5ea7\u3067\u4fdd\u7ba1, \u30ab\u30a6\u30f3\u30bf\u30fc\u30d1\u30fc\u30c6\u30a3\u306e\u30c7\u30d5\u30a9\u30eb\u30c8\u304b\u3089\u4fdd\u8b77\n\n\u5909\u52d5\u8a3c\u62e0\u91d1\uff08VM\uff09\uff1a\n\u2022 \u6642\u4fa1\u8a55\u4fa1\u306b\u57fa\u3065\u304d\u65e5\u6b21\u3067\u4ea4\u63db\n\u2022 \u5b9f\u969b\u306e\u640d\u76ca\u3092\u53cd\u6620, \u52dd\u3063\u3066\u3044\u308b\u5074\u304c\u8ca0\u3051\u3066\u3044\u308b\u5074\u304b\u3089VM\u3092\u53d7\u9818\n\u2022 \u73fe\u91d1\u3067\u6c7a\u6e08\uff08\u6642\u306b\u8a3c\u5238\u3082\u53ef\uff09\n\u2022 \u6bce\u65e5\u30a8\u30af\u30b9\u30dd\u30fc\u30b8\u30e3\u30fc\u3092\u30bc\u30ed\u306b\u30ea\u30bb\u30c3\u30c8\n\n\u91cd\u8981\u306a\u9055\u3044\uff1aIM\u306f\u5c06\u6765\u306e\u6f5c\u5728\u7684\u640d\u5931\u306b\u5bfe\u3059\u308b\u4fdd\u8b77\u3002VM\u306f\u4eca\u65e5\u306e\u5b9f\u969b\u306e\u640d\u76ca\u3092\u6c7a\u6e08\u3002\n\n2008\u5e74\u4ee5\u964d\uff1aUMR\uff08\u975e\u6e05\u7b97\u8a3c\u62e0\u91d1\u898f\u5247\uff09\u306b\u3088\u308a\u3001\u4e00\u5b9a\u95be\u5024\u4ee5\u4e0a\u306e\u4e8c\u8005\u9593OTC\u30c7\u30ea\u30d0\u30c6\u30a3\u30d6\u306b\u3082IM\u3068VM\u306e\u4e21\u65b9\u304c\u5fc5\u8981\u306b\u3002',
      beginnerNote:'Initial margin = security deposit paid upfront, held until the deal is done. Variation margin = daily settlement of who owes whom based on today\'s market price. Together they prevent anyone from accumulating too much risk.',
      beginnerNoteJa:'\u5f53\u521d\u8a3c\u62e0\u91d1 = \u524d\u6255\u3044\u306e\u4fdd\u8a3c\u91d1\u3001\u53d6\u5f15\u7d42\u4e86\u307e\u3067\u4fdd\u6301\u3002\u5909\u52d5\u8a3c\u62e0\u91d1 = \u4eca\u65e5\u306e\u5e02\u5834\u4fa1\u683c\u3067\u300c\u8ab0\u304c\u3044\u304f\u3089\u8ca0\u3051\u3066\u3044\u308b\u304b\u300d\u3092\u65e5\u3005\u7cbe\u7b97\u3002\u3053\u306e2\u3064\u3067\u30ea\u30b9\u30af\u304c\u84c4\u7a4d\u3057\u3059\u304e\u306a\u3044\u3088\u3046\u306b\u3057\u307e\u3059\u3002' },
    { id:'tq7', question:'What is a corporate action and give examples.', questionJa:'コーポレートアクションとは何ですか？例を挙げてください。',
      answer:'A corporate action is an event initiated by a public company that affects its securities holders.\n\nMandatory (automatic): Dividends (cash/stock), stock splits/reverse splits, mergers & acquisitions, delistings.\nVoluntary (holder must choose): Tender offers, rights issues, convertible bond conversion.\nMandatory with choice: Dividend with option for cash or additional shares.\n\nWhy Ops cares:\n\u2022 Missed or incorrect processing = direct financial loss\n\u2022 Time-sensitive, election deadlines, record dates, ex-dates must be tracked precisely\n\u2022 High volume, hundreds of corporate actions daily across global markets\n\u2022 Cross-border complexity, tax withholding rules differ by country\n\nKey dates: Declaration date (announced) \u2192 Ex-date (stock trades without entitlement) \u2192 Record date (who owns it?) \u2192 Payment date (distribution).',
      answerJa:'\u30b3\u30fc\u30dd\u30ec\u30fc\u30c8\u30a2\u30af\u30b7\u30e7\u30f3\u306f\u4e0a\u5834\u4f01\u696d\u304c\u958b\u59cb\u3059\u308b\u3001\u8a3c\u5238\u4fdd\u6709\u8005\u306b\u5f71\u97ff\u3059\u308b\u30a4\u30d9\u30f3\u30c8\u3002\n\n\u5f37\u5236\u7684\uff08\u81ea\u52d5\uff09\uff1a\u914d\u5f53\uff08\u73fe\u91d1/\u682a\u5f0f\uff09\u3001\u682a\u5f0f\u5206\u5272/\u4f75\u5408\u3001M&A\u3001\u4e0a\u5834\u5ec3\u6b62\u3002\n\u4efb\u610f\uff08\u4fdd\u6709\u8005\u304c\u9078\u629e\uff09\uff1a\u516c\u958b\u8cb7\u4ed8\u3001\u65b0\u682a\u4e88\u7d04\u6a29\u3001\u8ee2\u63db\u793e\u50b5\u306e\u8ee2\u63db\u3002\n\u9078\u629e\u4ed8\u304d\u5f37\u5236\uff1a\u73fe\u91d1\u307e\u305f\u306f\u8ffd\u52a0\u682a\u5f0f\u3092\u9078\u3079\u308b\u914d\u5f53\u3002\n\nOps\u304c\u91cd\u8996\u3059\u308b\u7406\u7531\uff1a\n\u2022 \u51e6\u7406\u6f0f\u308c\u30fb\u8aa4\u308a = \u76f4\u63a5\u7684\u306a\u91d1\u92ad\u7684\u640d\u5931\n\u2022 \u6642\u9593\u306b\u654f\u611f, \u9078\u629e\u671f\u9650\u3001\u57fa\u6e96\u65e5\u3001\u6a29\u5229\u843d\u3061\u65e5\u3092\u6b63\u78ba\u306b\u8ffd\u8de1\u3059\u308b\u5fc5\u8981\n\u2022 \u5927\u91cf\u51e6\u7406, \u30b0\u30ed\u30fc\u30d0\u30eb\u5e02\u5834\u3067\u6bce\u65e5\u6570\u767e\u306e\u30b3\u30fc\u30dd\u30ec\u30fc\u30c8\u30a2\u30af\u30b7\u30e7\u30f3\n\u2022 \u30af\u30ed\u30b9\u30dc\u30fc\u30c0\u30fc\u306e\u8907\u96d1\u3055, \u6e90\u6cc9\u5fb4\u53ce\u7a0e\u306e\u898f\u5247\u304c\u56fd\u3054\u3068\u306b\u7570\u306a\u308b\n\n\u91cd\u8981\u306a\u65e5\u4ed8\uff1a\u767a\u8868\u65e5 \u2192 \u6a29\u5229\u843d\u3061\u65e5\uff08\u3053\u306e\u65e5\u4ee5\u964d\u306e\u8cfc\u5165\u8005\u306f\u6a29\u5229\u306a\u3057\uff09 \u2192 \u57fa\u6e96\u65e5\uff08\u8ab0\u304c\u4fdd\u6709\u8005\u304b\uff1f\uff09 \u2192 \u652f\u6255\u65e5\uff08\u5206\u914d\uff09\u3002',
      beginnerNote:'When a company pays a dividend, splits its stock, or merges with another company, Ops must update all records. Miss a dividend = the bank loses money. Process a stock split incorrectly = positions are wrong everywhere.',
      beginnerNoteJa:'\u4f01\u696d\u304c\u914d\u5f53\u3092\u652f\u6255\u3063\u305f\u308a\u3001\u682a\u5f0f\u5206\u5272\u3057\u305f\u308a\u3001\u5408\u4f75\u3057\u305f\u308a\u3059\u308b\u6642\u3001Ops\u306f\u5168\u8a18\u9332\u3092\u66f4\u65b0\u3057\u307e\u3059\u3002\u914d\u5f53\u3092\u898b\u843d\u3068\u305b\u3070\u9280\u884c\u306f\u640d\u3092\u3057\u3001\u682a\u5f0f\u5206\u5272\u3092\u8aa4\u3063\u3066\u51e6\u7406\u3059\u308c\u3070\u30dd\u30b8\u30b7\u30e7\u30f3\u304c\u3059\u3079\u3066\u72c2\u3044\u307e\u3059\u3002' },
    { id:'tq8', question:'What is T+1 settlement and what are its implications for Operations?', questionJa:'T+1決済とは何ですか？オペレーションへの影響は？',
      answer:'T+1 means a trade settles one business day after execution (T = Trade date). The US moved equities, ETFs, and certain fixed income to T+1 in May 2024 (SEC Rule 15c6-1). Canada and Mexico moved simultaneously.\n\nHistory: T+3 \u2192 T+2 (2017) \u2192 T+1 (2024). Each reduction lowers counterparty risk.\n\nImplications for Ops:\n\u2022 Less time to resolve breaks, 2 days of buffer became 1\n\u2022 Higher STP requirements, manual processing can\'t keep up\n\u2022 Same-day allocation deadlines for institutional trades\n\u2022 Cross-border challenges, Asian/European investors face time zone issues with US markets\n\u2022 Compressed securities lending recall timing\n\u2022 FX funding must be arranged faster\n\nOther regions: EU considering T+1 (~2027). India already on T+1 since 2023. Japan and UK evaluating.\n\nBig picture: T+1 is a catalyst for Ops modernization, firms relying on manual processes were forced to automate.',
      answerJa:'T+1\u306f\u53d6\u5f15\u304c\u7d04\u5b9a\u306e\u7fcc\u55b6\u696d\u65e5\u306b\u6c7a\u6e08\u3055\u308c\u308b\u3053\u3068\uff08T = \u7d04\u5b9a\u65e5\uff09\u3002\u7c73\u56fd\u306f2024\u5e745\u6708\u306b\u682a\u5f0f\u3001ETF\u3001\u4e00\u90e8\u50b5\u5238\u3092T+1\u306b\u79fb\u884c\uff08SEC Rule 15c6-1\uff09\u3002\u30ab\u30ca\u30c0\u3068\u30e1\u30ad\u30b7\u30b3\u3082\u540c\u6642\u79fb\u884c\u3002\n\n\u6b74\u53f2\uff1aT+3 \u2192 T+2\uff082017\u5e74\uff09 \u2192 T+1\uff082024\u5e74\uff09\u3002\u77ed\u7e2e\u306e\u305f\u3073\u306b\u30ab\u30a6\u30f3\u30bf\u30fc\u30d1\u30fc\u30c6\u30a3\u30ea\u30b9\u30af\u304c\u4f4e\u4e0b\u3002\n\nOps\u3078\u306e\u5f71\u97ff\uff1a\n\u2022 \u30d6\u30ec\u30fc\u30af\u89e3\u6c7a\u6642\u9593\u306e\u77ed\u7e2e, 2\u65e5\u306e\u30d0\u30c3\u30d5\u30a1\u304c1\u65e5\u306b\n\u2022 \u9ad8\u3044STP\u8981\u4ef6, \u624b\u4f5c\u696d\u3067\u306f\u8ffd\u3044\u3064\u304b\u306a\u3044\n\u2022 \u6a5f\u95a2\u6295\u8cc7\u5bb6\u53d6\u5f15\u306f\u5f53\u65e5\u30a2\u30ed\u30b1\u30fc\u30b7\u30e7\u30f3\u304c\u5fc5\u9808\n\u2022 \u30af\u30ed\u30b9\u30dc\u30fc\u30c0\u30fc\u306e\u8ab2\u984c, \u30a2\u30b8\u30a2/\u6b27\u5dde\u6295\u8cc7\u5bb6\u304c\u7c73\u56fd\u5e02\u5834\u3092\u53d6\u5f15\u3059\u308b\u969b\u306e\u30bf\u30a4\u30e0\u30be\u30fc\u30f3\u554f\u984c\n\u2022 \u8a3c\u5238\u8cb8\u501f\u30ea\u30b3\u30fc\u30eb\u30bf\u30a4\u30df\u30f3\u30b0\u306e\u5727\u7e2e\n\u2022 FX\u8cc7\u91d1\u8abf\u9054\u3092\u3088\u308a\u65e9\u304f\u624b\u914d\n\n\u4ed6\u5730\u57df\uff1aEU\u306fT+1\u3092\u691c\u8a0e\u4e2d\uff08~2027\u5e74\uff09\u3002\u30a4\u30f3\u30c9\u306f2023\u5e74\u306b\u5c0e\u5165\u6e08\u3002\u65e5\u672c\u3068\u82f1\u56fd\u306f\u8a55\u4fa1\u4e2d\u3002\n\n\u5168\u4f53\u50cf\uff1aT+1\u306fOps\u8fd1\u4ee3\u5316\u306e\u89e6\u5a92, \u624b\u4f5c\u696d\u306b\u983c\u3063\u3066\u3044\u305f\u4f01\u696d\u306f\u81ea\u52d5\u5316\u3092\u4f59\u5100\u306a\u304f\u3055\u308c\u305f\u3002',
      beginnerNote:'Settlement used to take 2 days, now it takes 1 day in the US. Less risk for everyone, but Ops has less time to fix problems, everything needs to move faster.',
      beginnerNoteJa:'\u6c7a\u6e08\u306f\u4ee5\u524d2\u65e5\u304b\u304b\u3063\u3066\u3044\u307e\u3057\u305f\u304c\u3001\u7c73\u56fd\u3067\u306f1\u65e5\u306b\u3002\u5168\u54e1\u306e\u30ea\u30b9\u30af\u304c\u6e1b\u308a\u307e\u3059\u304c\u3001Ops\u304c\u554f\u984c\u3092\u4fee\u6b63\u3059\u308b\u6642\u9593\u304c\u6e1b\u308a\u307e\u3057\u305f, \u5168\u3066\u304c\u3082\u3063\u3068\u901f\u304f\u52d5\u304f\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\u3002' },
    { id:'tq9', question:'What is STP and why does Operations care about it?', questionJa:'STP（Straight-Through Processing）とは何ですか？なぜOpsにとって重要ですか？',
      answer:'STP (Straight-Through Processing) is automated end-to-end trade processing with zero manual intervention.\n\nIdeal flow: Execution \u2192 Auto-booking \u2192 Auto-confirmation/matching \u2192 Auto-SSI enrichment \u2192 Auto-settlement instruction \u2192 Settlement\n\nWhy Ops cares:\n\u2022 Error reduction, manual steps are where most errors occur\n\u2022 Speed, essential for T+1\n\u2022 Cost, manual processing is expensive\n\u2022 Scalability, volumes spike 3-5x on volatile days\n\nSTP rate = (trades without manual touch ÷ total trades) \u00d7 100%. Top banks target 95%+.\n\nBarriers: non-standard products, bad reference data, legacy systems, manual allocation by asset managers.\n\nOps role: Monitor STP rates, eliminate manual touchpoints, work with technology to automate exceptions, maintain clean reference data (SSIs, counterparty identifiers).',
      answerJa:'STP\uff08Straight-Through Processing\uff09\u306f\u624b\u4f5c\u696d\u306e\u4ecb\u5165\u306a\u3057\u306b\u53d6\u5f15\u3092\u7aef\u304b\u3089\u7aef\u307e\u3067\u81ea\u52d5\u51e6\u7406\u3059\u308b\u3053\u3068\u3002\n\n\u7406\u60f3\u7684\u306a\u30d5\u30ed\u30fc\uff1a\u7d04\u5b9a \u2192 \u81ea\u52d5\u8a18\u5e33 \u2192 \u81ea\u52d5\u78ba\u8a8d/\u30de\u30c3\u30c1\u30f3\u30b0 \u2192 \u81ea\u52d5SSI\u30a8\u30f3\u30ea\u30c3\u30c1\u30e1\u30f3\u30c8 \u2192 \u81ea\u52d5\u6c7a\u6e08\u6307\u56f3 \u2192 \u6c7a\u6e08\n\nOps\u304c\u91cd\u8996\u3059\u308b\u7406\u7531\uff1a\n\u2022 \u30a8\u30e9\u30fc\u524a\u6e1b, \u30a8\u30e9\u30fc\u306e\u5927\u534a\u306f\u624b\u4f5c\u696d\u30b9\u30c6\u30c3\u30d7\u3067\u767a\u751f\n\u2022 \u30b9\u30d4\u30fc\u30c9, T+1\u6c7a\u6e08\u306b\u306f\u4e0d\u53ef\u6b20\n\u2022 \u30b3\u30b9\u30c8, \u624b\u4f5c\u696d\u306f\u9ad8\u30b3\u30b9\u30c8\n\u2022 \u30b9\u30b1\u30fc\u30e9\u30d3\u30ea\u30c6\u30a3, \u5909\u52d5\u306e\u5927\u304d\u3044\u65e5\u306f\u53d6\u5f15\u91cf\u304c3-5\u500d\u306b\u6025\u5897\n\nSTP\u7387 = \uff08\u624b\u4f5c\u696d\u306a\u3057\u306e\u53d6\u5f15 \u00f7 \u5168\u53d6\u5f15\uff09\u00d7 100%\u3002\u30c8\u30c3\u30d7\u9280\u884c\u306f95%\u4ee5\u4e0a\u3092\u76ee\u6a19\u3002\n\n\u969c\u58c1\uff1a\u975e\u6a19\u6e96\u5546\u54c1\u3001\u4e0d\u6b63\u78ba\u306a\u30ea\u30d5\u30a1\u30ec\u30f3\u30b9\u30c7\u30fc\u30bf\u3001\u30ec\u30ac\u30b7\u30fc\u30b7\u30b9\u30c6\u30e0\u3001\u30a2\u30bb\u30c3\u30c8\u30de\u30cd\u30fc\u30b8\u30e3\u30fc\u306b\u3088\u308b\u624b\u52d5\u30a2\u30ed\u30b1\u30fc\u30b7\u30e7\u30f3\u3002\n\nOps\u306e\u5f79\u5272\uff1aSTP\u7387\u306e\u76e3\u8996\u3001\u624b\u4f5c\u696d\u30dd\u30a4\u30f3\u30c8\u306e\u6392\u9664\u3001\u4f8b\u5916\u51e6\u7406\u306e\u81ea\u52d5\u5316\u3092\u30c6\u30af\u30ce\u30ed\u30b8\u30fc\u3068\u63a8\u9032\u3001\u30af\u30ea\u30fc\u30f3\u306a\u30ea\u30d5\u30a1\u30ec\u30f3\u30b9\u30c7\u30fc\u30bf\u306e\u7dad\u6301\u3002',
      beginnerNote:'STP means a trade flows from start to finish without anyone touching it manually. More automation = fewer errors, faster settlement. Ops targets 95%+ automation, the remaining exceptions are where human expertise matters.',
      beginnerNoteJa:'STP\u306f\u53d6\u5f15\u304c\u6700\u521d\u304b\u3089\u6700\u5f8c\u307e\u3067\u8ab0\u306e\u624b\u3082\u4ecb\u3055\u305a\u81ea\u52d5\u3067\u6d41\u308c\u308b\u3053\u3068\u3002\u81ea\u52d5\u5316\u304c\u9032\u3080\u307b\u3069\u30a8\u30e9\u30fc\u306f\u6e1b\u308a\u6c7a\u6e08\u306f\u901f\u304f\u306a\u308b\u3002Ops\u306f95%\u4ee5\u4e0a\u306e\u81ea\u52d5\u5316\u3092\u76ee\u6a19, \u6b8b\u308a\u306e\u4f8b\u5916\u3053\u305d\u4eba\u9593\u306e\u5c02\u9580\u6027\u304c\u5fc5\u8981\u306a\u90e8\u5206\u3067\u3059\u3002' },
    { id:'tq10', question:'What regulations affect Operations?', questionJa:'オペレーションに影響する規制は何ですか？',
      answer:'Major regulations Ops must comply with:\n\nPost-2008 reforms:\n\u2022 Dodd-Frank (US), EMIR (EU), central clearing of standardized OTC derivatives, trade reporting to repositories\n\u2022 Basel III/IV, bank capital requirements (buffer capital against losses)\n\nMarket structure:\n\u2022 MiFID II (EU), trade transparency, best execution, transaction reporting\n\u2022 CSDR (EU), settlement discipline (cash penalties for fails, mandatory buy-ins)\n\u2022 Reg SHO (US), short selling rules\n\nCompliance:\n\u2022 SOX (Sarbanes-Oxley), internal controls, audit trails\n\u2022 AML/KYC, detect suspicious transactions, verify client identity, sanctions screening (OFAC/EU lists)\n\nMargin:\n\u2022 UMR (Uncleared Margin Rules), IM/VM for bilateral OTC derivatives above thresholds\n\nOps role: Ensure timely trade reporting, complete audit trails, sanctions screening on every transaction, settlement discipline controls. Non-compliance = fines, reputational damage, potential license loss.',
      answerJa:'Ops\u304c\u9075\u5b88\u3059\u3079\u304d\u4e3b\u8981\u898f\u5236\uff1a\n\n2008\u5e74\u5371\u6a5f\u5f8c\u306e\u6539\u9769\uff1a\n\u2022 \u30c9\u30c3\u30c9\u30fb\u30d5\u30e9\u30f3\u30af\u6cd5\uff08\u7c73\u56fd\uff09/ EMIR\uff08EU\uff09, \u6a19\u6e96\u5316OTC\u30c7\u30ea\u30d0\u30c6\u30a3\u30d6\u306e\u4e2d\u592e\u6e05\u7b97\u3001\u30c8\u30ec\u30fc\u30c9\u30ea\u30dd\u30b8\u30c8\u30ea\u3078\u306e\u5831\u544a\n\u2022 Basel III/IV, \u9280\u884c\u306e\u81ea\u5df1\u8cc7\u672c\u898f\u5236\uff08\u640d\u5931\u306b\u5bfe\u3059\u308b\u30d0\u30c3\u30d5\u30a1\u8cc7\u672c\uff09\n\n\u5e02\u5834\u69cb\u9020\uff1a\n\u2022 MiFID II\uff08EU\uff09, \u53d6\u5f15\u306e\u900f\u660e\u6027\u3001\u6700\u826f\u57f7\u884c\u3001\u53d6\u5f15\u5831\u544a\n\u2022 CSDR\uff08EU\uff09, \u6c7a\u6e08\u898f\u5f8b\uff08\u30d5\u30a7\u30a4\u30eb\u3078\u306e\u73fe\u91d1\u30da\u30ca\u30eb\u30c6\u30a3\u3001\u5f37\u5236\u30d0\u30a4\u30a4\u30f3\uff09\n\u2022 Reg SHO\uff08\u7c73\u56fd\uff09, \u7a7a\u58f2\u308a\u898f\u5236\n\n\u30b3\u30f3\u30d7\u30e9\u30a4\u30a2\u30f3\u30b9\uff1a\n\u2022 SOX\u6cd5, \u5185\u90e8\u7d71\u5236\u3001\u76e3\u67fb\u8a3c\u8de1\n\u2022 AML/KYC, \u7591\u308f\u3057\u3044\u53d6\u5f15\u306e\u691c\u51fa\u3001\u672c\u4eba\u78ba\u8a8d\u3001\u5236\u88c1\u5bfe\u8c61\u30b9\u30af\u30ea\u30fc\u30cb\u30f3\u30b0\uff08OFAC/EU\u30ea\u30b9\u30c8\uff09\n\n\u8a3c\u62e0\u91d1\uff1a\n\u2022 UMR\uff08\u975e\u6e05\u7b97\u8a3c\u62e0\u91d1\u898f\u5247\uff09, \u95be\u5024\u4ee5\u4e0a\u306e\u4e8c\u8005\u9593OTC\u30c7\u30ea\u30d0\u30c6\u30a3\u30d6\u306bIM/VM\u304c\u5fc5\u8981\n\nOps\u306e\u5f79\u5272\uff1a\u53d6\u5f15\u5831\u544a\u306e\u671f\u9650\u9075\u5b88\u3001\u5b8c\u5168\u306a\u76e3\u67fb\u8a3c\u8de1\u3001\u5168\u53d6\u5f15\u306e\u5236\u88c1\u5bfe\u8c61\u30b9\u30af\u30ea\u30fc\u30cb\u30f3\u30b0\u3001\u6c7a\u6e08\u898f\u5f8b\u306e\u7ba1\u7406\u3002\u975e\u9075\u5b88 = \u7f70\u91d1\u3001\u30ec\u30d4\u30e5\u30c6\u30fc\u30b7\u30e7\u30f3\u640d\u5bb3\u3001\u30e9\u30a4\u30bb\u30f3\u30b9\u55aa\u5931\u306e\u53ef\u80fd\u6027\u3002',
      beginnerNote:'Regulations are the rules banks must follow. After the 2008 crisis, governments created stricter rules. Ops ensures the bank follows them all, reporting trades, checking sanctions lists, keeping complete records.',
      beginnerNoteJa:'\u898f\u5236\u306f\u9280\u884c\u304c\u5f93\u3046\u3079\u304d\u30eb\u30fc\u30eb\u30022008\u5e74\u306e\u5371\u6a5f\u5f8c\u3001\u4e16\u754c\u4e2d\u306e\u653f\u5e9c\u304c\u3088\u308a\u53b3\u3057\u3044\u30eb\u30fc\u30eb\u3092\u4f5c\u308a\u307e\u3057\u305f\u3002Ops\u306f\u305d\u308c\u3089\u5168\u3066\u306b\u9280\u884c\u304c\u5f93\u3063\u3066\u3044\u308b\u3053\u3068\u3092\u78ba\u8a8d, \u53d6\u5f15\u5831\u544a\u3001\u5236\u88c1\u30ea\u30b9\u30c8\u306e\u78ba\u8a8d\u3001\u5b8c\u5168\u306a\u8a18\u9332\u306e\u4fdd\u6301\u3002' },
];

// --- Case Studies ---
const caseStudies = [
    { id:'cs1', title:'Settlement Fail Investigation', titleJa:'決済失敗の調査',
      scenario:'A large equity trade ($50M) on a European exchange failed to settle on T+2. The counterparty claims they never received our settlement instructions. Your team is responsible for resolving this before end of day to avoid settlement discipline penalties under CSDR (EU regulation). Note: In the US, settlement fails may incur SEC Rule 204 buy-in requirements instead.',
      scenarioJa:'欧州の取引所での大口株式取引（$50M）がT+2に決済失敗しました。カウンターパーティは決済指示を受け取っていないと主張しています。CSDR（EU規制）の決済規律ペナルティを避けるため、あなたのチームは日中に解決する責任があります。注意：米国では、決済失敗はSEC Rule 204のバイイン要件が適用される場合があります。',
      framework:[
        {step:'Investigate',stepJa:'調査', items:['Check SWIFT message logs for MT540/541','Verify SSI (Standard Settlement Instructions) on file','Confirm custodian received and matched instructions','Check for any static data mismatches'],
         itemsJa:['MT540/541のSWIFTメッセージログを確認','ファイル上のSSI（標準決済指示）を検証','カストディアンが指示を受領・照合したか確認','スタティックデータの不一致をチェック']},
        {step:'Escalate & Communicate',stepJa:'エスカレーション＆コミュニケーション', items:['Alert senior Ops and trading desk','Contact counterparty Ops team directly','Engage custodian for priority processing','Document timeline for audit trail'],
         itemsJa:['シニアOpsとトレーディングデスクに報告','カウンターパーティのOpsチームに直接連絡','カストディアンに優先処理を依頼','監査証跡のためタイムラインを記録']},
        {step:'Resolve',stepJa:'解決', items:['Resend corrected instructions if needed','Request partial settlement if possible','Arrange buy-in or borrowing as last resort','Confirm settlement status with all parties'],
         itemsJa:['必要なら修正した指示を再送信','可能なら部分決済を要請','最終手段としてバイインまたは借入を手配','全当事者と決済状況を確認']},
        {step:'Prevent Recurrence',stepJa:'再発防止', items:['Root cause analysis: was it manual SSI entry error?','Propose automated SSI validation','Update procedures and training','Report incident per operational risk framework'],
         itemsJa:['根本原因分析：手動SSI入力エラーだったか？','自動SSI検証を提案','手順とトレーニングを更新','オペレーショナルリスクフレームワークに従いインシデント報告']},
      ]},
    { id:'cs2', title:'Reconciliation Break Resolution', titleJa:'照合ブレークの解決',
      scenario:'Your daily position reconciliation shows 150 breaks across the Fixed Income book. Management wants the break count reduced by 80% within 2 weeks. You need to propose an action plan.',
      scenarioJa:'日次ポジション照合で債券ブックに150件のブレークが表示されています。経営層は2週間以内にブレーク数を80%削減することを求めています。アクションプランを提案する必要があります。',
      framework:[
        {step:'Categorize',stepJa:'分類', items:['Group breaks by type: timing, price, quantity, missing trades','Identify top 5 root causes by frequency','Separate genuine breaks from false positives (timing differences)'],
         itemsJa:['種類別にブレークを分類：タイミング、価格、数量、欠落取引','頻度による上位5つの根本原因を特定','本当のブレークとフォールスポジティブ（タイミング差異）を分離']},
        {step:'Quick Wins',stepJa:'クイックウィン', items:['Auto-match timing differences with tolerance rules','Fix known static data issues in bulk','Clear aged breaks that are no longer valid'],
         itemsJa:['許容ルールでタイミング差異を自動マッチ','既知のスタティックデータ問題を一括修正','有効でない古いブレークをクリア']},
        {step:'Systemic Fixes',stepJa:'根本的修正', items:['Automate manual booking processes causing errors','Implement real-time matching with counterparties','Add validation rules at trade entry to prevent breaks'],
         itemsJa:['エラーの原因となる手動記帳プロセスを自動化','カウンターパーティとのリアルタイムマッチングを実装','ブレーク防止のため取引入力時の検証ルールを追加']},
        {step:'Measure & Report',stepJa:'測定＆報告', items:['Track break count daily, publish dashboard','Set KPIs: break count, ageing, time-to-resolve','Weekly review with management on progress'],
         itemsJa:['ブレーク数を日次で追跡、ダッシュボードを公開','KPI設定：ブレーク数、エージング、解決時間','経営層との進捗に関する週次レビュー']},
      ]},
    { id:'cs3', title:'Process Automation Business Case', titleJa:'プロセス自動化のビジネスケース',
      scenario:'Your team manually processes 200 trade confirmations per day for OTC derivatives. Each takes 15 minutes. Management asks you to build a business case for automation.',
      scenarioJa:'あなたのチームはOTCデリバティブのトレードコンファメーションを毎日200件手動で処理しています。各件15分かかります。経営層から自動化のビジネスケースを作るよう求められました。',
      framework:[
        {step:'Current State Analysis',stepJa:'現状分析', items:['200 confirms × 15 min = 50 hours/day = ~6 FTEs','Error rate: estimate 2-3% manual error rate','Cost: salary + error remediation + regulatory risk'],
         itemsJa:['200件 × 15分 = 50時間/日 = 約6名分のFTE','エラー率：手動エラー率2-3%と推定','コスト：人件費 + エラー修正費 + 規制リスク']},
        {step:'Proposed Solution',stepJa:'提案する解決策', items:['Electronic confirmation matching platform (e.g., MarkitWire)','Auto-matching rules for standard terms','Exception-only workflow for manual review'],
         itemsJa:['電子コンファメーションマッチングプラットフォーム（例：MarkitWire）','標準条件の自動マッチングルール','手動レビューは例外のみのワークフロー']},
        {step:'Benefits',stepJa:'効果', items:['Reduce processing time by 80%+','Reduce error rate to <0.5%','Free up 4-5 FTEs for higher-value work','Faster settlement, lower operational risk'],
         itemsJa:['処理時間を80%以上削減','エラー率を0.5%未満に削減','4-5名のFTEをより価値の高い業務に振り替え','決済高速化、オペレーショナルリスク低減']},
        {step:'Implementation',stepJa:'実装', items:['Phase 1: standard IRS (highest volume) - 8 weeks','Phase 2: CDS, FX options - 6 weeks','Phase 3: exotic products - 8 weeks','ROI: estimated payback in 12-18 months'],
         itemsJa:['フェーズ1：標準IRS（最大ボリューム）- 8週間','フェーズ2：CDS、FXオプション - 6週間','フェーズ3：エキゾチック商品 - 8週間','ROI：12-18ヶ月で投資回収見込み']},
      ]},
];

// --- Glossary ---
const glossaryTerms = [
    {term:'DvP', termJa:'DvP', fullName:'Delivery versus Payment',
      def:'Simultaneous exchange of securities and cash, eliminating principal risk.',
      defJa:'証券と現金の同時交換。元本リスクを排除する仕組み。',
      usage:'Settlement instructions: "This trade settles DvP." Discussed when explaining why settlement is safe.',
      usageJa:'決済指示：「この取引はDvPで決済」。決済の安全性を説明する場面で使用。',
      beginnerDef:'Like using an escrow service, both sides deliver at the same time so nobody gets cheated.', beginnerDefJa:'エスクローサービスのようなもの, 両者が同時に引き渡すので誰も騙されない。'},
    {term:'CCP', termJa:'CCP', fullName:'Central Counterparty',
      def:'Intermediary between buyer and seller in cleared trades. Becomes the buyer to every seller and vice versa.',
      defJa:'清算対象取引で買い手と売り手の間に入る仲介者。全売り手の買い手、全買い手の売り手になる。',
      usage:'Post-trade: "Is this trade cleared or bilateral?" Margin calls: "The CCP is calling for additional margin." Risk: "Counterparty risk is reduced because the CCP guarantees settlement." Examples: LCH (rates), CME (futures), JSCC (Japan).',
      usageJa:'ポストトレード：「この取引はCCP清算？それとも相対？」 マージンコール：「CCPから追加証拠金の請求が来ている」 リスク：「CCPが決済を保証するのでカウンターパーティリスクが軽減される」 例：LCH（金利）、CME（先物）、JSCC（日本）。',
      beginnerDef:'A trusted middleman who guarantees both sides will follow through on a deal.', beginnerDefJa:'取引の両当事者が約束を果たすことを保証する信頼できる仲介者。'},
    {term:'CSD', termJa:'CSD', fullName:'Central Securities Depository',
      def:'Holds securities in dematerialized (electronic) form. Examples: DTCC, Euroclear, JASDEC.',
      defJa:'証券を電子化された形で保管する機関。例：DTCC、Euroclear、JASDEC。',
      usage:'Custody discussions: "Securities are held at the CSD." Settlement infrastructure conversations.',
      usageJa:'カストディの議論：「証券はCSDに保管」。決済インフラの会話で使用。',
      beginnerDef:'A digital vault that keeps track of who owns which securities.', beginnerDefJa:'誰がどの証券を所有しているか記録するデジタル金庫。'},
    {term:'SSI', termJa:'SSI', fullName:'Standard Settlement Instructions',
      def:'Pre-agreed account details for settlement. Incorrect SSIs are a common cause of settlement fails.',
      defJa:'決済のための事前合意された口座情報。誤ったSSIは決済失敗の一般的な原因。',
      usage:'Settlement ops: "Check the SSIs on file." Break investigation: "The SSI was outdated."',
      usageJa:'決済業務：「ファイルのSSIを確認して」。ブレーク調査：「SSIが古かった」。',
      beginnerDef:'Like saved delivery addresses, pre-set account details so payments go to the right place.', beginnerDefJa:'保存された配送先住所のようなもの, 支払いが正しい場所に届くよう事前設定された口座情報。'},
    {term:'STP', termJa:'STP', fullName:'Straight-Through Processing',
      def:'Automated end-to-end trade processing without manual intervention. Higher STP rate = fewer errors.',
      defJa:'手作業なしの端から端までの自動取引処理。STP率が高い＝エラーが少ない。',
      usage:'KPI discussions: "Our STP rate is 95%." Process improvement: "How can we increase STP?"',
      usageJa:'KPIの議論：「STP率は95%」。プロセス改善：「STPをどう上げるか」。',
      beginnerDef:'A fully automated assembly line where trades are processed without anyone having to step in.', beginnerDefJa:'誰も介入することなく取引が処理される完全自動化された組立ライン。'},
    {term:'Break', termJa:'ブレーク',
      def:'Discrepancy between two records that should match. Types: trade breaks, position breaks, cash breaks.',
      defJa:'一致すべき2つの記録間の不一致。種類：取引ブレーク、ポジションブレーク、現金ブレーク。',
      usage:'Daily ops: "We have 15 breaks to resolve today." Reconciliation reports.',
      usageJa:'日次業務：「今日解決すべきブレークが15件」。照合レポートで使用。',
      beginnerDef:'When your notes say one thing but the other person\'s notes say something different.', beginnerDefJa:'あなたのメモと相手のメモが違うことを言っている状態。'},
    {term:'Netting', termJa:'ネッティング',
      def:'Offsetting mutual obligations to reduce settlement amounts and volumes.',
      defJa:'相互の債務を相殺し決済額と件数を削減すること。',
      usage:'CCP clearing: "Netting reduced our settlement obligations by 80%." Efficiency discussions.',
      usageJa:'CCP清算：「ネッティングで決済義務が80%減少」。効率化の議論で使用。',
      beginnerDef:'If I owe you $100 and you owe me $80, we just settle the $20 difference.', beginnerDefJa:'私があなたに100ドル、あなたが私に80ドル借りているなら、20ドルの差額だけ決済する。'},
    {term:'Margin Call', termJa:'マージンコール',
      def:'Demand for additional collateral when a position moves against you.',
      defJa:'ポジションが不利に動いた際の追加担保の要求。',
      usage:'Risk management: "We received a margin call from the CCP." Daily collateral operations.',
      usageJa:'リスク管理：「CCPからマージンコールを受けた」。日次の担保管理業務で使用。',
      beginnerDef:'Like a landlord asking for more deposit because property values dropped.', beginnerDefJa:'物件価値が下がったので大家さんが追加の保証金を求めるようなもの。'},
    {term:'SWIFT', termJa:'SWIFT', fullName:'Society for Worldwide Interbank Financial Telecommunication',
      def:'Global messaging network for financial institutions. Message types: MT103 (payment), MT540/541 (settlement).',
      defJa:'金融機関のグローバルメッセージングネットワーク。メッセージ種別：MT103（送金）、MT540/541（決済）。',
      usage:'Settlement ops: "Send the MT541 via SWIFT." Investigation: "Check the SWIFT message log."',
      usageJa:'決済業務：「SWIFTでMT541を送信して」。調査：「SWIFTメッセージログを確認して」。',
      beginnerDef:'The messaging app that banks use to talk to each other worldwide.', beginnerDefJa:'世界中の銀行同士がやり取りするメッセージングアプリ。'},
    {term:'KYC/AML', termJa:'KYC/AML', fullName:'Know Your Customer / Anti-Money Laundering',
      def:'Client verification and transaction monitoring requirements to prevent financial crime.',
      defJa:'金融犯罪防止のためのクライアント検証と取引監視の要件。',
      usage:'Client onboarding: "KYC checks must be completed before trading." Compliance reviews.',
      usageJa:'クライアントオンボーディング：「取引前にKYCチェックを完了する必要がある」。コンプライアンスレビューで使用。',
      beginnerDef:'ID check at the door, making sure customers are who they say they are and their money is legitimate.', beginnerDefJa:'入口でのID確認, 顧客が本人であり、お金が合法であることを確認。'},
    {term:'ISDA', termJa:'ISDA', fullName:'International Swaps and Derivatives Association',
      def:'Standard legal framework for OTC derivatives trading. The ISDA Master Agreement governs most OTC trades.',
      defJa:'OTCデリバティブ取引の標準的な法的枠組み。ISDAマスター契約がほとんどのOTC取引を規定。',
      usage:'OTC trading: "Do we have an ISDA in place with this counterparty?" Legal/documentation teams.',
      usageJa:'OTC取引：「このカウンターパーティとのISDAはあるか？」法務・ドキュメンテーションチームで使用。'},
    {term:'Custodian', termJa:'カストディアン',
      def:'Institution holding securities on behalf of clients. Examples: BNY Mellon, State Street, MUFG.',
      defJa:'顧客に代わって証券を保管する機関。例：BNYメロン、ステートストリート、MUFG。',
      usage:'Settlement: "Instruct the custodian to release the securities." Asset servicing discussions.',
      usageJa:'決済：「カストディアンに証券のリリースを指示して」。アセットサービシングの議論で使用。',
      beginnerDef:'Like a bank vault that holds your valuable items safely.', beginnerDefJa:'大切な物を安全に保管する銀行の金庫のようなもの。'},
    {term:'Corporate Action', termJa:'コーポレートアクション',
      def:'Event by a company affecting its securities: dividends, stock splits, mergers, rights issues.',
      defJa:'証券に影響する企業のイベント：配当、株式分割、合併、新株予約権。',
      usage:'Ops processing: "We need to process the dividend corporate action by record date." Announcement monitoring.',
      usageJa:'業務処理：「基準日までに配当コーポレートアクションを処理する必要がある」。アナウンスメントの監視で使用。',
      beginnerDef:'A company decision that changes something about its stock, like paying dividends or splitting shares.', beginnerDefJa:'株式に関わる企業の決定, 配当の支払いや株式分割など。'},
    {term:'FIX Protocol', termJa:'FIXプロトコル', fullName:'Financial Information eXchange',
      def:'Industry standard electronic trading messaging protocol. Uses tag=value pairs (e.g., Tag 35=D for New Order).',
      defJa:'業界標準の電子取引メッセージングプロトコル。タグ=値のペアを使用（例：Tag 35=D は新規注文）。',
      usage:'Trading systems: "Orders are sent via FIX." Integration: "Parse the FIX execution report."',
      usageJa:'取引システム：「注文はFIXで送信」。システム連携：「FIXの約定レポートを解析して」。'},
    {term:'T+1 / T+2', termJa:'T+1 / T+2',
      def:'Settlement cycle. T = Trade date. US equities moved to T+1 in May 2024.',
      defJa:'決済サイクル。T=取引日。米国株式は2024年5月にT+1に移行。',
      usage:'Settlement planning: "This settles T+1." Cross-border: "Japan equities settle T+2."',
      usageJa:'決済計画：「これはT+1で決済」。クロスボーダー：「日本株はT+2で決済」。',
      beginnerDef:'How many business days after buying before money and securities actually change hands.', beginnerDefJa:'購入後、お金と証券が実際にやり取りされるまでの営業日数。'},
    {term:'Operational Risk', termJa:'オペレーショナルリスク',
      def:'Risk of loss from failed internal processes, people, systems, or external events.',
      defJa:'内部プロセス、人、システム、外部事象の失敗による損失リスク。',
      usage:'Incident reports: "This is an operational risk event." Risk frameworks: RCSA, KRI tracking.',
      usageJa:'インシデント報告：「これはオペレーショナルリスクイベント」。リスクフレームワーク：RCSA、KRI管理で使用。',
      beginnerDef:'The risk that something goes wrong because of human error, computer failures, or broken processes.', beginnerDefJa:'人的ミス、コンピュータ障害、壊れたプロセスが原因で何かがうまくいかないリスク。'},
    {term:'CSDR', termJa:'CSDR', fullName:'Central Securities Depositories Regulation',
      def:'EU regulation on settlement discipline. Imposes penalties for settlement fails and mandatory buy-ins.',
      defJa:'決済規律に関するEU規制。決済失敗に対するペナルティと強制バイインを課す。',
      usage:'EU settlement: "CSDR penalties apply to this fail." Regulatory compliance discussions.',
      usageJa:'EU決済：「この失敗にはCSDRペナルティが適用される」。規制コンプライアンスの議論で使用。'},
    {term:'Herstatt Risk', termJa:'ヘルシュタットリスク',
      def:'FX settlement risk where one currency leg settles but the other does not due to time zone differences.',
      defJa:'タイムゾーンの違いにより一方の通貨が決済されてもう一方が決済されないFX決済リスク。',
      usage:'FX settlement: "CLS was created to eliminate Herstatt risk." Cross-border risk discussions.',
      usageJa:'FX決済：「CLSはヘルシュタットリスクを排除するために作られた」。クロスボーダーリスクの議論で使用。'},
    {term:'Affirmation / Confirmation', termJa:'アファメーション / コンファメーション',
      def:'Affirmation: investor confirms trade details with broker. Confirmation: legal agreement of trade terms between counterparties.',
      defJa:'アファメーション：投資家がブローカーとの取引詳細を確認。コンファメーション：カウンターパーティ間の取引条件の法的合意。',
      usage:'Post-trade: "The trade is affirmed, waiting for confirmation." OTC derivatives documentation.',
      usageJa:'ポストトレード：「取引はアファーム済み、コンファメーション待ち」。OTCデリバティブのドキュメンテーションで使用。'},
    {term:'Allocation / Block Trade', termJa:'アロケーション / ブロックトレード',
      def:'Block trade: single large order executed as one. Allocation: splitting it into sub-accounts for different funds.',
      defJa:'ブロックトレード：一括で執行される大口注文。アロケーション：異なるファンドのサブアカウントに分配。',
      usage:'Asset management ops: "The block trade needs to be allocated across 5 client funds by EOD."',
      usageJa:'アセットマネジメント業務：「ブロックトレードを営業日終了までに5つのクライアントファンドにアロケーションする必要がある」。'},
    {term:'Novation', termJa:'ノベーション',
      def:'Replacing an existing contract with a new one, substituting a new party. Core mechanism of CCP clearing.',
      defJa:'既存の契約を新しい契約に置き換え、新しい当事者を代替する。CCP清算の核となる仕組み。',
      usage:'CCP clearing: "The CCP novates between buyer and seller." Contract restructuring.',
      usageJa:'CCP清算：「CCPが買い手と売り手の間にノベーション」。契約再構築で使用。'},
    {term:'Buy-in', termJa:'バイイン',
      def:'Buyer purchases securities in the open market because the seller failed to deliver. Seller bears the price difference.',
      defJa:'売り手が引き渡しに失敗したため、買い手が公開市場で証券を購入。売り手が価格差を負担。',
      usage:'Settlement fails: "If not resolved by day 4, we initiate a buy-in." CSDR mandatory buy-in rules.',
      usageJa:'決済失敗：「4日目までに解決しなければバイインを開始」。CSDRの強制バイインルールで使用。'},
    {term:'PvP / FOP', termJa:'PvP / FOP', fullName:'Payment vs Payment / Free of Payment',
      def:'PvP: simultaneous exchange of two currencies (via CLS). FOP: securities transfer without cash (e.g., collateral movements).',
      defJa:'PvP：2通貨の同時交換（CLS経由）。FOP：現金交換なしの証券移転（例：担保移動）。',
      usage:'FX settlement: "Settle via CLS on a PvP basis." Collateral: "Move bonds FOP for margin."',
      usageJa:'FX決済：「CLSでPvPベースで決済」。担保：「証拠金としてFOPで債券を移動」。'},
    {term:'Nostro / Vostro', termJa:'ノストロ / ボストロ',
      def:'Nostro: "our" account at another bank. Vostro: "their" account at our bank. Key for cash reconciliation.',
      defJa:'ノストロ：他行に開設した「当方の」口座。ボストロ：当行に開設された「先方の」口座。現金照合の要。',
      usage:'Cash reconciliation: "Check the nostro balance." Correspondent banking discussions.',
      usageJa:'現金照合：「ノストロ残高を確認して」。コルレス銀行の議論で使用。'},
    {term:'ISIN / CUSIP / LEI', termJa:'ISIN / CUSIP / LEI', fullName:'International Securities Identification Number / Committee on Uniform Securities Identification Procedures / Legal Entity Identifier',
      def:'ISIN: global securities ID. CUSIP: US/Canada ID. LEI: unique counterparty identifier.',
      defJa:'ISIN：グローバル証券識別番号。CUSIP：米国/カナダの識別子。LEI：取引主体を一意に識別。',
      usage:'Trade booking: "Enter the ISIN for this bond." Regulatory reporting: "LEI is required for all reports."',
      usageJa:'取引記帳：「この債券のISINを入力して」。規制報告：「全レポートにLEIが必要」。'},
    {term:'UMR', termJa:'UMR', fullName:'Uncleared Margin Rules',
      def:'Global rules requiring bilateral OTC derivative counterparties to exchange initial and variation margin.',
      defJa:'二者間OTCデリバティブのカウンターパーティに当初証拠金と変動証拠金の交換を義務付けるグローバルな規則。',
      usage:'Collateral management: "UMR Phase 6 brought smaller firms into scope." Margin operations.',
      usageJa:'担保管理：「UMR Phase 6で小規模企業も対象に」。マージン業務で使用。'},
    {term:'Settlement Agent / Paying Agent', termJa:'決済エージェント / 支払エージェント',
      def:'Settlement agent: facilitates securities settlement. Paying agent: distributes coupon/dividend payments for the issuer.',
      defJa:'決済エージェント：証券決済を仲介。支払エージェント：発行体に代わりクーポン/配当を支払い。',
      usage:'Bond operations: "Who is the paying agent for this bond issue?" Settlement coordination.',
      usageJa:'債券業務：「この債券発行の支払エージェントは誰か？」決済の調整で使用。'},
    {term:'MTM', termJa:'MTM', fullName:'Mark-to-Market',
      def:'Revaluing a position based on current market prices. Used daily for margin calculations and P&L.',
      defJa:'現在の市場価格に基づきポジションを再評価すること。証拠金計算と損益に日次で使用。',
      usage:'Daily ops: "Run the MTM for all derivatives positions." Margin calls are based on MTM changes.',
      usageJa:'日次業務：「全デリバティブポジションのMTMを実行」。マージンコールはMTMの変動に基づく。'},
    {term:'P&L', termJa:'P&L', fullName:'Profit and Loss',
      def:'In trading, P&L is the profit or loss on a desk or position (realized + unrealized). Product Control calculates it; Ops ensures the underlying trade data is accurate. Also refers to the broader financial statement.',
      defJa:'トレーディングでは、デスクやポジションの損益（実現＋未実現）を指す。プロダクトコントロールが算出し、Opsは基礎となる取引データの正確性を確保。広義には財務諸表も指す。',
      usage:'Daily task: "Reconcile the P&L for all desks." Also: "P&L attribution" explains why profits changed.',
      usageJa:'日次業務：「全デスクのP&Lを照合」。「P&Lアトリビューション」は利益変動の原因を説明する。'},
    {term:'ROE / ROA', termJa:'ROE / ROA', fullName:'Return on Equity / Return on Assets',
      def:'ROE = net income / shareholders\' equity: measures how efficiently a firm uses invested capital. ROA = net income / total assets. Banks have lower ROA due to leverage. ROE is compared against cost of equity to assess value creation.',
      defJa:'ROE = 純利益 / 株主資本：投下資本の効率性を測定。ROA = 純利益 / 総資産。銀行はレバレッジが高いためROAは低め。ROEは株主資本コストと比較して価値創造を評価する。',
      usage:'Analysts compare banks: "Their ROE dropped to 8%, below the cost of equity." ROA is lower for banks due to leverage.',
      usageJa:'アナリストが銀行を比較：「ROEが8%に低下し、株主資本コストを下回った」。銀行はレバレッジが高いためROAは低めになる。'},
    {term:'NAV', termJa:'NAV', fullName:'Net Asset Value',
      def:'The total value of a fund\'s assets minus liabilities, divided by shares outstanding. Calculated daily for mutual funds and ETFs. Ops teams verify NAV accuracy.',
      defJa:'ファンドの総資産から負債を引いた額を発行口数で割った値。投資信託やETFで日次計算。オペレーション部門がNAVの正確性を検証する。',
      usage:'Fund ops: "Calculate and publish the NAV by 6pm." Errors in NAV calculation can trigger regulatory issues.',
      usageJa:'ファンド業務：「18時までにNAVを計算・公表」。NAV計算エラーは規制上の問題を引き起こす可能性がある。'},
    {term:'Coupon', termJa:'クーポン',
      def:'The periodic interest payment made to bondholders, expressed as an annual percentage of face value. A 5% coupon on a $1,000 bond pays $50/year (often $25 semiannually).',
      defJa:'債券保有者に定期的に支払われる利息。額面に対する年率で表示。額面$1,000、クーポン5%なら年$50（半年ごとに$25が一般的）。',
      usage:'Bond settlement: "Process the coupon payment for all outstanding corporate bonds." Ops handles payment distribution to holders.',
      usageJa:'債券決済：「全発行済み社債のクーポン支払を処理」。オペレーションが保有者への支払分配を担当。'},
    {term:'Yield', termJa:'利回り',
      def:'The return earned on an investment, usually expressed as an annual percentage. Bond yield reflects coupon payments and price changes. When bond prices go up, yields go down (inverse relationship).',
      defJa:'投資で得られるリターンで、通常年率で表示。債券利回りはクーポン支払と価格変動を反映。債券価格が上がると利回りは下がる（逆相関）。',
      usage:'Markets context: "Treasury yields rose to 4.5%." Understanding yield curves helps in fixed income operations.',
      usageJa:'市場の文脈：「米国債利回りが4.5%に上昇」。イールドカーブの理解は債券オペレーションに役立つ。'},
    {term:'Liquidity', termJa:'流動性',
      def:'How quickly and easily an asset can be bought or sold without significantly affecting its price. Cash is the most liquid; real estate is illiquid. Low liquidity can increase the risk of settlement fails.',
      defJa:'資産を価格に大きな影響を与えずにどれだけ迅速に売買できるか。現金が最も流動的で、不動産は非流動的。流動性の低さは決済不履行のリスクを高める要因となる。',
      usage:'Risk context: "Monitor liquidity in emerging market bonds." Settlement teams watch for liquidity issues that cause fails.',
      usageJa:'リスクの文脈：「新興国債券の流動性を監視」。決済チームは決済不履行の原因となる流動性問題を注視。'},
];

// ============================================================
// RENDERING
// ============================================================
const content = document.getElementById('content');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const langBtn = document.getElementById('lang-btn');
let currentSection = 'dashboard';

function h(tag, attrs, ...children){
    const el = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => {
        if (k === 'className') el.className = v;
        else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
        else if (k === 'innerHTML') el.innerHTML = v;
        else el.setAttribute(k, v);
    });
    children.flat().forEach(c => { if (c != null) el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return el;
}

function beginnerNoteEl(obj) {
    const note = L(obj, 'beginnerNote');
    if (!note) return null;
    return h('div', { className: 'beginner-note' }, note);
}

function beginnerDefEl(obj) {
    const def = L(obj, 'beginnerDef');
    if (!def) return null;
    return h('div', { className: 'beginner-note', style: 'margin-top:8px' }, def);
}

function updateNavLabels(){
    const labels = { dashboard:t('dashboard'), 'finance-basics':t('financeBasics'), 'trade-lifecycle':t('tradeLifecycle'), 'market-knowledge':t('marketKnowledge'), behavioral:t('behavioral'), technical:t('technical'), 'case-study':t('caseStudy'), glossary:t('glossary'), references:t('references') };
    navLinks.forEach(l => { const icon = l.querySelector('.nav-icon'); l.innerHTML = (icon ? icon.outerHTML : '') + ' ' + (labels[l.dataset.section] || ''); });
    langBtn.textContent = currentLang === 'ja' ? 'EN / JA  (JA)' : 'EN / JA  (EN)';
}

// --- Sidebar ---
function openSidebar(){ sidebar.classList.add('open'); sidebarOverlay.classList.add('active'); }
function closeSidebar(){ sidebar.classList.remove('open'); sidebarOverlay.classList.remove('active'); }
navLinks.forEach(link => link.addEventListener('click', e => { e.preventDefault(); navigateTo(link.dataset.section); }));
menuToggle.addEventListener('click', () => { sidebar.classList.contains('open') ? closeSidebar() : openSidebar(); });
sidebarOverlay.addEventListener('click', closeSidebar);
langBtn.addEventListener('click', () => { currentLang = currentLang === 'en' ? 'ja' : 'en'; localStorage.setItem('fin-ops-lang', currentLang); document.documentElement.lang = currentLang === 'ja' ? 'ja' : 'en'; updateNavLabels(); navigateTo(currentSection); });

function navigateTo(section, params){
    currentSection = section;
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === section));
    closeSidebar();
    const r = { dashboard:renderDashboard, 'finance-basics':renderFinanceBasics, 'trade-lifecycle':renderTradeLifecycle, 'market-knowledge':renderMarketKnowledge, behavioral:renderBehavioral, technical:renderTechnical, 'case-study':renderCaseStudy, glossary:renderGlossary, references:renderReferences };
    (r[section] || renderDashboard)(params);
    window.scrollTo(0, 0);
}


// --- Dashboard ---
function renderDashboard(){
    content.innerHTML = '';
    content.appendChild(h('div', {className:'page-header'}, h('h2', null, t('dashboard')), h('p', null, t('description'))));

    // Section navigation cards
    const sections = [
        {name:t('financeBasics'), items:financeBasicsTopics, section:'finance-basics'},
        {name:t('tradeLifecycle'), items:tradeLifecycleSteps, section:'trade-lifecycle'},
        {name:t('marketKnowledge'), items:marketTopics, section:'market-knowledge'},
        {name:t('behavioral'), items:behavioralQuestions, section:'behavioral'},
        {name:t('technical'), items:technicalQuestions, section:'technical'},
        {name:t('caseStudy'), items:caseStudies, section:'case-study'},
        {name:t('glossary'), items:glossaryTerms, section:'glossary'},
    ];
    const grid = h('div', {className:'category-grid'},
        ...sections.map(sec =>
            h('div', {className:'category-card', onClick:() => navigateTo(sec.section)},
                h('div', {className:'card-header'}, h('h3', {className:'card-title'}, sec.name), h('span', {className:'count'}, sec.items.length + (currentLang==='ja'?'項目':' items')))))
    );
    content.appendChild(grid);

    // Industry Topics
    const topicsCard = h('div', {className:'card', style:'margin-top:24px'},
        h('h3', {className:'card-title', style:'margin-bottom:6px'}, t('recentTopicsTitle')),
        h('p', {style:'color:var(--text-muted);font-size:.85rem;margin-bottom:14px'}, t('recentTopicsDesc')));
    industryTopics.forEach(rt => {
        const title = L(rt, 'topic');
        const desc = L(rt, 'desc');
        const linkEl = rt.url ? h('a', {href:rt.url, target:'_blank', rel:'noopener noreferrer', style:'font-size:.8rem;color:var(--accent);text-decoration:none;margin-left:8px'}, '\u2197') : null;
        topicsCard.appendChild(h('div', {style:'margin-bottom:12px'},
            h('h4', {style:'color:var(--accent);font-size:.95rem;margin-bottom:4px'}, title, linkEl),
            h('p', {style:'color:var(--text-muted);font-size:.85rem;line-height:1.6'}, desc)));
    });
    content.appendChild(topicsCard);
}

// --- Finance Basics ---
function renderFinanceBasics(){
    content.innerHTML = '';
    content.appendChild(h('div', {className:'page-header'}, h('h2', null, t('financeBasicsTitle')), h('p', null, t('financeBasicsDesc'))));
    financeBasicsTopics.forEach(topic => {
        const card = h('div', {className:'card'});
        card.appendChild(h('h3', {className:'card-title'}, L(topic, 'title')));
        card.appendChild(h('p', {style:'margin-bottom:12px;line-height:1.7'}, L(topic, 'content')));
        const points = currentLang === 'ja' && topic.keyPointsJa ? topic.keyPointsJa : topic.keyPoints;
        if (points) {
            card.appendChild(h('div', {className:'design-step'},
                h('h4', null, currentLang === 'ja' ? 'ポイント' : 'Key Points'),
                h('ul', {style:'padding-left:20px;color:var(--text-muted);line-height:1.7'}, ...points.map(p => h('li', null, p)))));
        }
        content.appendChild(card);
    });
}

// --- Trade Lifecycle ---
function renderTradeLifecycle(){
    content.innerHTML = '';
    content.appendChild(h('div', {className:'page-header'}, h('h2', null, t('tradeLifecycleTitle')), h('p', null, t('tradeLifecycleDesc'))));
    // Flow diagram
    const flowSteps = currentLang === 'ja'
        ? ['KYC/開設','約定','清算','決済','事後処理','リスク管理']
        : ['Onboarding','Execution','Clearing','Settlement','Post-Trade','Risk & Control'];
    const flowDiagram = h('div', {className:'flow-diagram'});
    flowSteps.forEach((s, i) => {
        flowDiagram.appendChild(h('div', {className:'flow-step'}, s));
        if (i < flowSteps.length - 1) flowDiagram.appendChild(h('div', {className:'flow-arrow'}, '\u2192'));
    });
    content.appendChild(flowDiagram);
    tradeLifecycleSteps.forEach(step => {
        const card = h('div', {className:'card'});
        card.appendChild(h('h3', {className:'card-title'}, L(step, 'title')));
        card.appendChild(h('p', {style:'margin-bottom:12px;line-height:1.7'}, L(step, 'content')));
        const bn = beginnerNoteEl(step);
        if (bn) card.appendChild(bn);
        card.appendChild(h('div', {className:'design-step'}, h('h4', null, currentLang === 'ja' ? 'Opsの役割' : 'Ops Role'), h('p', {style:'color:var(--text-muted)'}, L(step, 'opsRole'))));
        content.appendChild(card);
    });
}

// --- Market Knowledge ---
function renderMarketKnowledge(){
    content.innerHTML = '';
    content.appendChild(h('div', {className:'page-header'}, h('h2', null, t('marketTitle')), h('p', null, t('marketDesc'))));
    marketTopics.forEach(topic => {
        const card = h('div', {className:'card'});
        card.appendChild(h('h3', {className:'card-title'}, L(topic, 'title')));
        card.appendChild(h('p', {style:'line-height:1.7;white-space:pre-line'}, L(topic, 'content')));
        const bn = beginnerNoteEl(topic);
        if (bn) card.appendChild(bn);
        content.appendChild(card);
    });
}

// --- Behavioral ---
function renderBehavioral(params){
    if (params && params.view === 'detail'){ renderBehavioralDetail(params.id); return; }
    content.innerHTML = '';
    content.appendChild(h('div', {className:'page-header'}, h('h2', null, t('behavioralTitle')), h('p', null, t('behavioralDesc'))));
    content.appendChild(h('div', {className:'card', style:'margin-bottom:24px'},
        h('h3', {className:'card-title', style:'margin-bottom:10px'}, t('starMethod')),
        h('p', {style:'color:var(--text-muted);font-size:.9rem;line-height:1.7', innerHTML:t('starDesc')})));
    const list = h('div', {className:'problem-list'});
    behavioralQuestions.forEach(q => {
        list.appendChild(h('div', {className:'problem-item', onClick:() => navigateTo('behavioral', {view:'detail', id:q.id})},
            h('span', {className:'title'}, L(q, 'question'))));
    });
    content.appendChild(list);
}
function renderBehavioralDetail(qId){
    const q = behavioralQuestions.find(x => x.id === qId); if (!q) return;
    content.innerHTML = '';
    content.appendChild(h('div', {className:'breadcrumb'}, h('a', {href:'#', onClick:e => {e.preventDefault();navigateTo('behavioral');}}, t('behavioral')), ' > ' + L(q, 'question')));
    content.appendChild(h('h2', {style:'margin-bottom:16px;font-size:1.3rem'}, L(q, 'question')));
    // Tips
    content.appendChild(h('div', {className:'card', style:'margin-bottom:20px'}, h('p', {style:'color:var(--text-muted);font-size:.9rem;line-height:1.7'}, L(q, 'tips'))));
    // STAR guidance (read-only)
    const sp = currentLang === 'ja' && q.starPromptJa ? q.starPromptJa : q.starPrompt;
    const starCard = h('div', {className:'card'},
        h('h4', {style:'color:var(--accent);margin-bottom:12px'}, currentLang === 'ja' ? 'STAR回答の組み立て方' : 'How to Structure Your STAR Answer'),
        h('div', {className:'design-step', style:'margin-bottom:8px'}, h('strong', null, 'S: '), sp.s),
        h('div', {className:'design-step', style:'margin-bottom:8px'}, h('strong', null, 'T: '), sp.t),
        h('div', {className:'design-step', style:'margin-bottom:8px'}, h('strong', null, 'A: '), sp.a),
        h('div', {className:'design-step', style:'margin-bottom:0'}, h('strong', null, 'R: '), sp.r));
    content.appendChild(starCard);
}

// --- Technical Q&A ---
function renderTechnical(){
    content.innerHTML = '';
    content.appendChild(h('div', {className:'page-header'}, h('h2', null, t('technicalTitle')), h('p', null, t('technicalDesc'))));
    technicalQuestions.forEach(q => {
        const card = h('div', {className:'card'});
        card.appendChild(h('h4', {className:'card-title'}, L(q, 'question')));
        const bn = beginnerNoteEl(q);
        if (bn) card.appendChild(bn);
        const ansTitle = h('div', {className:'collapsible', style:'margin-top:10px;color:var(--accent)', onClick:() => {ansTitle.classList.toggle('open');ansBody.classList.toggle('show');}}, t('showAnswer'));
        const ansBody = h('div', {className:'collapsible-content'}, h('div', {className:'design-step', style:'border-left-color:var(--green)'}, h('p', {style:'line-height:1.7;white-space:pre-line'}, L(q, 'answer'))));
        card.appendChild(ansTitle); card.appendChild(ansBody);
        content.appendChild(card);
    });
}

// --- Case Studies ---
function renderCaseStudy(params){
    if (params && params.view === 'detail'){ renderCaseDetail(params.id); return; }
    content.innerHTML = '';
    content.appendChild(h('div', {className:'page-header'}, h('h2', null, t('caseTitle')), h('p', null, t('caseDesc'))));
    const list = h('div', {className:'problem-list'});
    caseStudies.forEach(cs => {
        list.appendChild(h('div', {className:'problem-item', onClick:() => navigateTo('case-study', {view:'detail', id:cs.id})},
            h('span', {className:'title'}, L(cs, 'title'))));
    });
    content.appendChild(list);
}
function renderCaseDetail(csId){
    const cs = caseStudies.find(x => x.id === csId); if (!cs) return;
    content.innerHTML = '';
    content.appendChild(h('div', {className:'breadcrumb'}, h('a', {href:'#', onClick:e => {e.preventDefault();navigateTo('case-study');}}, t('caseStudy')), ' > ' + L(cs, 'title')));
    content.appendChild(h('h2', {style:'margin-bottom:16px'}, L(cs, 'title')));
    content.appendChild(h('div', {className:'card', style:'margin-bottom:20px'}, h('p', {style:'line-height:1.7'}, L(cs, 'scenario'))));
    cs.framework.forEach(step => {
        const items = currentLang === 'ja' && step.itemsJa ? step.itemsJa : step.items;
        content.appendChild(h('div', {className:'design-step'}, h('h4', null, currentLang === 'ja' && step.stepJa ? step.stepJa : step.step), h('ul', null, ...items.map(i => h('li', null, i)))));
    });
}

// --- Glossary ---
function renderGlossary(){
    content.innerHTML = '';
    content.appendChild(h('div', {className:'page-header'}, h('h2', null, t('glossaryTitle')), h('p', null, t('glossaryDesc'))));
    glossaryTerms.forEach(g => {
        const card = h('div', {className:'card', style:'padding:14px 20px'});
        const termLine = h('div', {style:'display:flex;gap:8px;align-items:baseline;flex-wrap:wrap;margin-bottom:6px'});
        termLine.appendChild(h('span', {style:'font-weight:700;color:var(--accent);font-size:1rem'}, L(g, 'term')));
        if (g.fullName) termLine.appendChild(h('span', {style:'color:var(--text-muted);font-size:.8rem'}, '= ' + g.fullName));
        card.appendChild(termLine);
        card.appendChild(h('p', {style:'color:var(--text);font-size:.9rem;line-height:1.6;margin-bottom:6px'}, L(g, 'def')));
        const bd = beginnerDefEl(g);
        if (bd) card.appendChild(bd);
        const usageText = L(g, 'usage');
        if (usageText) card.appendChild(h('div', {style:'margin-top:8px;padding:8px 12px;background:var(--bg-input);border-radius:6px;font-size:.8rem;color:var(--text-muted);line-height:1.5'},
            h('span', {style:'font-weight:600;color:var(--accent)'}, currentLang === 'ja' ? 'Usage: ' : 'Usage: '), usageText));
        content.appendChild(card);
    });
}

// --- Industry Topics (shown on dashboard) ---
const industryTopics = [
    {topic:'T+1 Settlement (US)', topicJa:'T+1決済（米国）',
     desc:'US equities moved from T+2 to T+1 in May 2024. Processing time halved, making automation critical.',
     descJa:'2024年5月に米国株式がT+2からT+1に移行。オペレーションの処理時間が半減し、自動化の重要性が増大。',
     url:'https://www.sec.gov/oiea/investor-alerts-and-bulletins/new-t1-settlement-cycle-what-investors-need-know-investor'},
    {topic:'AI & Automation in Operations', topicJa:'AI・自動化とオペレーション',
     desc:'RPA, AI-powered reconciliation, anomaly detection, NLP for confirmation matching are transforming Operations.',
     descJa:'RPAやAIによる照合自動化、異常検知、自然言語処理によるコンファメーション読み取りなどが進展。',
     url:'https://www.deloitte.com/us/en/insights/industry/financial-services/financial-services-industry-predictions.html'},
    {topic:'Operational Resilience', topicJa:'オペレーショナルレジリエンス',
     desc:'Post-COVID, business continuity and cybersecurity became top priorities. Regulators now require detailed resilience plans.',
     descJa:'コロナ禍以降、業務継続性（BCP）とサイバーセキュリティへの注目が高まった。規制当局も金融機関にレジリエンス計画を義務化。',
     url:'https://www.bis.org/bcbs/publ/d516.htm'},
    {topic:'ESG & Sustainable Finance', topicJa:'ESG・サステナブルファイナンス',
     desc:'Environmentally and socially responsible investing is growing. Ops handles green bond processing and ESG data management.',
     descJa:'環境・社会・ガバナンスに配慮した投資が拡大。Opsはグリーンボンドの発行処理やESGデータ管理で関わる。',
     url:'https://www.investopedia.com/terms/e/environmental-social-and-governance-esg-criteria.asp'},
    {topic:'Digital Assets & DLT', topicJa:'デジタルアセットと分散台帳',
     desc:'Crypto assets and tokenized securities are emerging. Blockchain-based settlement (T+0) is being explored.',
     descJa:'暗号資産やトークン化証券など新しい資産クラスが登場。ブロックチェーンを使った即時決済（T+0）が議論されている。',
     url:'https://www.dtcc.com/digital-assets'},
];

// --- References ---
const referenceSources = [
    { category: 'Trade Lifecycle & Settlement', categoryJa: 'トレードライフサイクル・決済',
      links: [
        { title: 'CFI: Trade Lifecycle', url: 'https://corporatefinanceinstitute.com/resources/capital_markets/what-is-the-trade-lifecycle/', desc: 'Overview of the full trade lifecycle from execution to settlement.', descJa: '約定から決済までのトレードライフサイクルの概要。' },
        { title: 'BIS: Principles for Financial Market Infrastructures', url: 'https://www.bis.org/cpmi/publ/d101a.pdf', desc: 'International standards for CCPs, CSDs, and payment systems.', descJa: 'CCP、CSD、決済システムに関する国際基準。' },
        { title: 'DTCC: Settlement & Asset Services', url: 'https://www.dtcc.com/clearing-services', desc: 'How the largest post-trade infrastructure works.', descJa: '世界最大のポストトレードインフラの仕組み。' },
    ]},
    { category: 'Regulations & Compliance', categoryJa: '規制・コンプライアンス',
      links: [
        { title: 'SEC: T+1 Settlement Guide', url: 'https://www.sec.gov/oiea/investor-alerts-and-bulletins/new-t1-settlement-cycle-what-investors-need-know-investor', desc: 'Official SEC investor bulletin on T+1 settlement transition.', descJa: 'T+1決済への移行に関するSECの投資家向けガイド。' },
        { title: 'ISDA: Margin Rules & Documentation', url: 'https://www.isda.org/category/margin/', desc: 'OTC derivatives margin requirements and UMR.', descJa: 'OTCデリバティブの証拠金要件とUMR。' },
        { title: 'ESMA: CSDR Settlement Discipline', url: 'https://www.esma.europa.eu/press-news/esma-news/esma-issues-technical-standards-settlement-discipline-under-csdr', desc: 'EU settlement discipline standards under CSDR.', descJa: 'CSDRに基づくEUの決済規律基準。' },
    ]},
    { category: 'Career Resources', categoryJa: 'キャリアリソース',
      links: [
        { title: 'Wall Street Oasis: Interview Guides', url: 'https://www.wallstreetoasis.com/resources/interviews', desc: 'Community-contributed interview questions and guides across finance roles.', descJa: '金融の各職種の面接質問とガイド（コミュニティ投稿）。' },
        { title: 'Investopedia: Financial Terms Dictionary', url: 'https://www.investopedia.com/financial-term-dictionary-4769738', desc: 'Comprehensive glossary of financial terms.', descJa: '金融用語の包括的な辞書。' },
        { title: 'M&I: Front/Middle/Back Office Guide', url: 'https://mergersandinquisitions.com/front-office-middle-office-back-office/', desc: 'Guide to front, middle, and back office roles in finance.', descJa: '金融のフロント・ミドル・バックオフィスの役割ガイド。' },
    ]},
    { category: 'Industry Knowledge', categoryJa: '業界知識',
      links: [
        { title: 'Investopedia: Asset Classes Guide', url: 'https://www.investopedia.com/terms/a/assetclasses.asp', desc: 'Overview of equities, fixed income, FX, and derivatives.', descJa: '株式、債券、FX、デリバティブの概要。' },
        { title: 'CME Group: Education', url: 'https://www.cmegroup.com/education', desc: 'Free courses on futures, options, and clearing.', descJa: '先物、オプション、清算に関する無料コース。' },
        { title: 'Bank of Japan: Payment and Settlement', url: 'https://www.boj.or.jp/en/paym/outline/index.htm', desc: 'Overview of Japan\'s payment and settlement systems.', descJa: '日本の決済システムの概要。' },
    ]},
];

function renderReferences() {
    content.innerHTML = '';
    content.appendChild(h('div', {className:'page-header'}, h('h2', null, t('references')), h('p', null, t('referencesDesc'))));
    referenceSources.forEach(cat => {
        const card = h('div', {className:'card'}, h('h3', {className:'card-title', style:'margin-bottom:12px'}, L(cat, 'category')));
        cat.links.forEach(link => {
            const a = h('a', {href:link.url, target:'_blank', rel:'noopener noreferrer', style:'color:var(--accent);text-decoration:none;font-weight:600;font-size:.9rem'}, link.title);
            const desc = h('p', {style:'color:var(--text-muted);font-size:.82rem;margin-top:2px;margin-bottom:12px;line-height:1.6'}, L(link, 'desc'));
            card.appendChild(h('div', null, a, desc));
        });
        content.appendChild(card);
    });
}

// --- Init ---
updateNavLabels();
navigateTo('dashboard');
