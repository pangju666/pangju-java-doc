import{_ as i,c as a,o as n,ag as l}from"./chunks/framework.XA8aHGu3.js";const D=JSON.parse('{"title":"加密方案","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"commons/crypto/transformation.md","filePath":"commons/crypto/transformation.md","lastUpdated":1761555515000}'),t={name:"commons/crypto/transformation.md"};function p(h,s,k,e,A,g){return n(),a("div",null,[...s[0]||(s[0]=[l(`<h1 id="加密方案" tabindex="-1">加密方案 <a class="header-anchor" href="#加密方案" aria-label="Permalink to &quot;加密方案&quot;">​</a></h1><p>我定义了一个RSA加密方案接口，并实现了<code>RSA/ECB/PKCS1Padding</code>和<code>RSA/ECB/OAEPWithSHA-256AndMGF1Padding</code>两种常用方案</p><h2 id="rsa" tabindex="-1">RSA <a class="header-anchor" href="#rsa" aria-label="Permalink to &quot;RSA&quot;">​</a></h2><h3 id="接口" tabindex="-1">接口 <a class="header-anchor" href="#接口" aria-label="Permalink to &quot;接口&quot;">​</a></h3><p><code>io.github.pangju666.commons.crypto.transformation.RSATransformation</code></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * RSA加密转换策略接口，定义加密算法模式、填充方式及分块处理逻辑</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * &lt;p&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 本接口为RSA加密算法提供标准化的转换方案定义，支持多种填充模式和分块策略，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 确保不同实现间的兼容性和一致性。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * &lt;/p&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * &lt;h3&gt;核心职责&lt;/h3&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * &lt;ul&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *   &lt;li&gt;&lt;b&gt;算法定义&lt;/b&gt; - 提供标准化的算法/模式/填充名称&lt;/li&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *   &lt;li&gt;&lt;b&gt;分块计算&lt;/b&gt; - 根据密钥规格计算加密/解密分块尺寸&lt;/li&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *   &lt;li&gt;&lt;b&gt;扩展支持&lt;/b&gt; - 允许自定义填充方案实现&lt;/li&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * &lt;/ul&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * &lt;h3&gt;典型实现&lt;/h3&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * &lt;ol&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *   &lt;li&gt;PKCS#1 v1.5填充方案&lt;/li&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *   &lt;li&gt;OAEP填充方案（推荐）&lt;/li&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * &lt;/ol&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@author</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> pangju666</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@since</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 1.0.0</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@see</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> java.security.spec.RSAPublicKeySpec</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@see</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> java.security.spec.RSAPrivateKeySpec</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RSATransformation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * 获取完整的算法转换方案名称</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * &lt;p&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * 返回符合JCE标准的算法转换字符串，格式为&quot;算法/模式/填充&quot;。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * 该名称将直接用于Cipher.getInstance()方法初始化。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * &lt;/p&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * &lt;h3&gt;命名规范&lt;/h3&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * &lt;ul&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *   &lt;li&gt;&lt;b&gt;算法&lt;/b&gt;：固定为&quot;RSA&quot;&lt;/li&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *   &lt;li&gt;&lt;b&gt;模式&lt;/b&gt;：通常为&quot;ECB&quot;（RSA无实际模式）&lt;/li&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *   &lt;li&gt;&lt;b&gt;填充&lt;/b&gt;：如&quot;PKCS1Padding&quot;、&quot;OAEPWithSHA-256AndMGF1Padding&quot;&lt;/li&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * &lt;/ul&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@return</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 标准算法转换名称，格式示例：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *         &lt;ul&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *           &lt;li&gt;&quot;RSA/ECB/PKCS1Padding&quot;&lt;/li&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *           &lt;li&gt;&quot;RSA/ECB/OAEPWithSHA-256AndMGF1Padding&quot;&lt;/li&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *         &lt;/ul&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@since</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 1.0.0</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	String </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * 计算公钥加密分块尺寸</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * &lt;p&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * 根据RSA公钥模数长度和填充方案计算单次加密操作的最大数据量。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * &lt;/p&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * &lt;h3&gt;计算规则&lt;/h3&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * &lt;ul&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *   &lt;li&gt;PKCS#1 v1.5：模数字节数 - 11&lt;/li&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *   &lt;li&gt;OAEP：模数字节数 - 2*hLen - 2（hLen为哈希长度）&lt;/li&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *   &lt;li&gt;无填充：模数字节数&lt;/li&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * &lt;/ul&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@param</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> keySpec</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> RSA公钥规格，包含模数和公钥指数</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@return</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 单次加密允许的最大字节数</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@throws</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> NullPointerException</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 当keySpec为null时抛出</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@since</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 1.0.0</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getEncryptBlockSize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(RSAPublicKeySpec </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">keySpec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * 计算私钥解密分块尺寸（默认实现）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * &lt;p&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * 默认返回模数对应的字节长度，适用于大多数填充方案。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * &lt;/p&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * &lt;h3&gt;实现说明&lt;/h3&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * &lt;ul&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *   &lt;li&gt;解密块大小通常等于模数字节长度&lt;/li&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *   &lt;li&gt;特殊填充方案可覆盖此方法&lt;/li&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *   &lt;li&gt;自动验证参数有效性&lt;/li&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * &lt;/ul&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 *</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@param</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> keySpec</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> RSA私钥规格，包含模数和私钥指数</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@return</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 单次解密处理的数据块字节数</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@throws</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> NullPointerException</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 当keySpec为null时抛出</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@since</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 1.0.0</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	 */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getDecryptBlockSize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(RSAPrivateKeySpec </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">keySpec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		Validate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">notNull</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(keySpec, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;keySpec 不能为 null&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> keySpec.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getModulus</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bitLength</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span></code></pre></div><h3 id="实现" tabindex="-1">实现 <a class="header-anchor" href="#实现" aria-label="Permalink to &quot;实现&quot;">​</a></h3><p><code>io.github.pangju666.commons.crypto.transformation.impl.RSAOEAPWithSHA256Transformation</code></p><p>加密分块尺寸计算公式：blockSize = (modulusBitLength / 8) - 2 * hashLength - 2</p><p>对于SHA-256，hashLength=32，因此总填充开销为66字节</p><p><code>io.github.pangju666.commons.crypto.transformation.impl.RSAPKCS1PaddingTransformation</code></p><p>加密分块尺寸计算公式：blockSize = (modulusBitLength / 8) - 11</p>`,12)])])}const d=i(t,[["render",p]]);export{D as __pageData,d as default};
