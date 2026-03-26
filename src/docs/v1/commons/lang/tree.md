---
layout: doc
---

# 树

## 说明

| 类名        | 类型  |             用途              |
|-----------|:----|:---------------------------:|
| TreeNode  | 接口  |  树形结构节点通用接口，定义树形数据结构的基本操作   |
| TreeUtils | 工具类 | 树形结构构建工具类，提供将扁平数据转换为树形结构的能力 |

## 树节点接口
`io.github.pangju666.commons.lang.model.TreeNode`

| 方法名              | 返回值     |      用途      |
|------------------|:--------|:------------:|
| getNodeKey       | 唯一标识键泛型 | 获取当前节点的唯一标识键 |
| getParentNodeKey | 唯一标识键泛型 | 获取父节点的唯一标识键  |
| setChildNodes    | 泛型      |   设置子节点集合    |

```java
public class TestNode implements TreeNode<Long, TestNode> {
		String name
		Long id
		Long parentId
		Collection<TestNode> childNodes = []

		TestNode(Long id, Long parentId, String name) {
			this.id = id
			this.parentId = parentId
			this.name = name
		}

		@Override
		Long getNodeKey() {
			return id
		}

		@Override
		Long getParentNodeKey() {
			return parentId
		}

		@Override
		void setChildNodes(Collection<TestNode> childNodes) {
			this.childNodes = childNodes
		}
	}
```

## 工具类
`io.github.pangju666.commons.lang.utils.TreeUtils`

### 构建树形结构
```java
List<TestNode> nodes = Arrays.asList(
			new TestNode(1L, null, "根节点"),
			new TestNode(2L, 1L, "子节点"),
			new TestNode(3L, 2L, "孙子节点"),
			new TestNode(4L, 3L, "曾孙节点")
		);

TreeUtils.toTree(nodes)
/*
[
  {
    "name": "根节点",
    "id": 1,
    "parentId": null,
    "childNodes": [
      {
        "name": "子节点",
        "id": 2,
        "parentId": 1,
        "childNodes": [
          {
            "name": "孙子节点",
            "id": 3,
            "parentId": 2,
            "childNodes": [
              {
                "name": "曾孙节点",
                "id": 4,
                "parentId": 3,
                "childNodes": [ ]
              }
            ]
          }
        ]
      }
    ]
  }
]

// 设置节点转换处理函数
TreeUtils.toTree(nodes, node -> {
    node.name = "node-" + node.name
})
/*
[
  {
    "name": "node-根节点",
    "id": 1,
    "parentId": null,
    "childNodes": [
      {
        "name": "node-子节点",
        "id": 2,
        "parentId": 1,
        "childNodes": [
          {
            "name": "node-孙子节点",
            "id": 3,
            "parentId": 2,
            "childNodes": [
              {
                "name": "node-曾孙节点",
                "id": 4,
                "parentId": 3,
                "childNodes": [ ]
              }
            ]
          }
        ]
      }
    ]
  }
]
*/
```
